import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children, params }) {
  const { id } = await params;
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Optional: Check if accessed ID matches user ID
  // if (id !== user.id) {
  //   redirect(`/${user.id}/home`) // example redirection
  // }

  return (
    <div className="h-full w-full">
      {children}
    </div>
  )
}
