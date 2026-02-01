import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Authenticate user using pgcrypto
    const userResult = await query(
      `SELECT id FROM users WHERE email = $1 AND password_hash = crypt($2, password_hash)`,
      [email, password]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const userId = userResult.rows[0].id;

    // Create session
    // Long login support: 30 days expiration
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

    await query(
      `INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)`,
      [userId, sessionToken, expiresAt]
    );

    // Set cookie
    // Note: In Next.js App Router, we use cookies() from next/headers
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
