import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BoardPlaygroundCanvas from "@/components/internal/canvas/BoardPlaygroundCanvas";

export default function LandingBoardShowcase({ ctaHref, ctaLabel }) {
  return (
    <section className="rounded-3xl border border-zinc-800  bg-[url('https://cursor.com/marketing-static/_next/image?url=https%3A%2F%2Fptht05hbb1ssoooe.public.blob.vercel-storage.com%2Fassets%2Fmisc%2Fasset-00a586c62c8782e65c0a.jpg&w=1920&q=70')] p-6 md:p-8 xl:p-10">
      <div className="flex flex-col gap-10">
        <div className="space-y-5">
         
          <h3 className="text-3xl leading-tight font-semibold text-white">
            Build in real time with the full Geiger Notes interface.
          </h3>

          <p className="max-w-sm text-zinc-800">
            This playground runs locally on the page with the complete canvas system, node types, controls, and interactions. No save and no load, just pure exploration.
          </p>

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative rounded-2xl border border-zinc-700/80 bg-[#191919] p-3">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#161616] h-[80vh] min-h-[850px] max-h-[820px]">
            <BoardPlaygroundCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}