import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: baseState, error: baseStateError } = await supabase
    .from('base')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (baseStateError) {
    console.error('[Home] Failed to check base workspace:', baseStateError);
  }

  if (!baseState) {
    const { error: createBaseError } = await supabase
      .from('base')
      .insert({
        user_id: user.id,
        nodes: '[]',
        edges: '[]',
        viewport: '{"x":0,"y":0,"zoom":1}',
      });

    if (createBaseError && createBaseError.code !== '23505') {
      console.error('[Home] Failed to create base workspace:', createBaseError);
    }
  }

  redirect(`/${user.id}/home`);
}
