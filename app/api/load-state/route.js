import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const boardId = searchParams.get('boardId');
        
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let query;
        if (boardId) {
            query = supabase
                .from('boards')
                .select('nodes, edges, viewport, name')
                .eq('id', boardId)
                .single();
        } else {
            query = supabase
                .from('base')
                .select('nodes, edges, viewport')
                .eq('user_id', user.id)
                .single();
        }

        const { data, error } = await query;

        if (error) {
            // If no record exists, return null (first time user)
            if (error.code === 'PGRST116') {
                return NextResponse.json({ 
                    nodes: null, 
                    edges: null, 
                    viewport: null,
                    name: null 
                });
            }
            console.error('[API] Supabase error:', error);
            return NextResponse.json(
                { error: 'Database Error', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            nodes: data.nodes,
            edges: data.edges,
            viewport: data.viewport,
            name: data.name
        });
    } catch (error) {
        console.error('[API] Error loading state:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
