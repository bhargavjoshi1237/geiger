import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: 'Direct login is disabled for Geiger Notes. Please log in from Geiger Dash.',
    },
    { status: 410 }
  );
}
