import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
    try {
        const supabase = await createClient();
        
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { nodes, edges, viewport, boardId } = body;

        const nodesStr = typeof nodes === 'string' ? nodes : JSON.stringify(nodes);
        const edgesStr = typeof edges === 'string' ? edges : JSON.stringify(edges);
        const viewportStr = typeof viewport === 'string' ? viewport : JSON.stringify(viewport);

        let result;

        if (boardId) {
             result = await supabase
                .from('boards')
                .update({
                    nodes: nodesStr,
                    edges: edgesStr,
                    viewport: viewportStr,
                    updated_at: new Date().toISOString()
                })
                .eq('id', boardId)
                .eq('user_id', user.id); 
        } else {
            const { data: existing } = await supabase
                .from('base')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (existing) {
                 result = await supabase
                    .from('base')
                    .update({
                        nodes: nodesStr,
                        edges: edgesStr,
                        viewport: viewportStr
                    })
                    .eq('user_id', user.id);
            } else {
                 result = await supabase
                    .from('base')
                    .insert({
                        user_id: user.id,
                        nodes: nodesStr,
                        edges: edgesStr,
                        viewport: viewportStr
                    });
            }
        }

        if (result.error) {
            console.error('[API] Supabase error:', result.error);
             return NextResponse.json(
                { error: 'Database Error', details: result.error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[API] Error saving state:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
