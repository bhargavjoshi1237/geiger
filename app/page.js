import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <main className="relative z-10 flex flex-col items-center gap-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
        <div className="space-y-2">
          <h1 className="text-8xl p-2 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 select-none">
            Geiger
          </h1>
          <p className="text-sm font-mono tracking-[0.2em] text-zinc-500 uppercase">
            Stealth Workspaces
          </p>
        </div>
        <Link 
          href={`/${userId}/home`}
          className="group relative flex items-center gap-2 px-8 py-3 overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800 hover:border-zinc-700 hover:scale-105 active:scale-95"
        >
          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
            Initialize
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
        </Link>
      </main>
      <footer className="absolute bottom-8 text-xs text-zinc-700 font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
        System Ready v0.1.0
      </footer>
    </div>
  );
}
