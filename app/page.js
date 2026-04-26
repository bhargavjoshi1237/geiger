import Link from "next/link";
import {
  ArrowRight,
  Check,
  LayoutGrid,
  Lock,
  PenSquare,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/ui/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createClient } from "@/utils/supabase/server";
import LandingBoardShowcase from "@/components/LandingBoardShowcase";

export const metadata = {
  title: "Notes - Geiger Studio",
  description:
    "Create visual notes, organize ideas on infinite boards, and collaborate with your team in Geiger Notes.",
};

const features = [
  
];

const utilityCards = [
  {
    title: "Works with your tools",
    description:
      "Bring notes, files, and links from the tools your team already uses.",
    icon: LayoutGrid,
  },
  {
    title: "Stay productive offline",
    description:
      "Keep writing and organizing ideas even when your connection is unstable.",
    icon: Wifi,
  },
  {
    title: "Access from any device",
    description:
      "Open boards and documents from desktop or mobile without losing context.",
    icon: Smartphone,
  },
  {
    title: "Infinite Canvas",
    description: "Map ideas visually with free-form boards, smart zoom, and drag-and-drop building blocks.",
    icon: PenSquare,
  },
  {
    title: "Structured Navigation",
    description: "Create nested boards and move from overview to detail without losing context.",
    icon: LayoutGrid,
  },
  {
    title: "Real-Time Collaboration",
    description: "Share sessions, collaborate live, and keep everyone aligned while ideas evolve.",
    icon: Users,
  },
];

const faqs = [
  {
    value: "item-1",
    question: "How does Geiger Notes keep my content secure?",
    answer:
      "Geiger Notes uses secure authentication, controlled access paths, and project-based visibility to keep work private.",
  },
  {
    value: "item-2",
    question: "Do you use my notes for ads?",
    answer:
      "No. Your workspace content is not used for ad personalization.",
  },
  {
    value: "item-3",
    question: "Can I collaborate live with my team?",
    answer:
      "Yes. You can run live sessions, review changes together, and merge updates directly in shared boards.",
  },
  {
    value: "item-4",
    question: "Can Geiger Notes be used for client or business workflows?",
    answer:
      "Yes. Teams use it for planning, visual documentation, workshops, and client-facing review flows.",
  },
];

export default async function NotesLandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const notesRoot = basePath.replace("/notes", "") || "/notes";
  const dashOrigin = (process.env.NEXT_PUBLIC_DASH_ORIGIN).replace(/\/$/, "");
  const boardHref = user ? `${notesRoot}/${user.id}/home` : "";
  const loginHref = `${dashOrigin}/login?next=${encodeURIComponent(notesRoot)}`;
  const profileImage = user?.id
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pfp/${user.id}/latest.jpg`
    : "";
  const profileName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "User";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${basePath}/logo1.svg`} alt="Geiger Notes" className="h-6 w-6" />
            <span className="text-sm font-medium text-zinc-200">Geiger Notes</span>
          </div>
          {user ? (
            <Link
              href={boardHref}
              className="inline-flex items-center rounded-full bg-zinc-900 p-0.5 hover:border-zinc-600 transition-colors"
              aria-label="Open board"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} alt={profileName} />
              </Avatar>
            </Link>
          ) : (
            <Button asChild variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800">
              <Link href={loginHref}>Log in</Link>
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14 space-y-14">
        
 <main className="mt-10">
        <section className="mb-16">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Capture, connect, and explore ideas on a living notes canvas.
          </h1>
          <p className="text-zinc-400 mb-6 max-w-xl">
            Geiger Notes combines free-form visual thinking with practical team workflows. Build boards, organize concepts, and collaborate in real time.
          </p>
          <Link
            href={user ? boardHref : loginHref}
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors"
          >
            {user ? "Continue to Your Board" : "Log in to Start"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50">
              <Icon className="h-6 w-6 text-zinc-400 mb-4" />
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h2>
              <p className="text-sm text-zinc-400">{description}</p>
            </article>
          ))}
        </section>
      </main>

        <LandingBoardShowcase
          ctaHref={user ? boardHref : loginHref}
          ctaLabel={user ? "Open your board" : "Log in to start"}
        />

    
        <section className="grid gap-4 md:grid-cols-3">
          {utilityCards.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-xl border border-zinc-800 bg-[#191919] p-5">
              <Icon className="h-5 w-5 text-zinc-300 mb-3" />
              <h4 className="text-zinc-100 font-medium">{title}</h4>
              <p className="text-sm text-zinc-400 mt-2">{description}</p>
            </article>
          ))}
        </section>
        <section className="rounded-2xl flex border border-zinc-800 bg-[#191919] p-6 md:p-8">
          <div className=" mr-auto w-[50%]">
            <h3 className="text-3xl font-semibold text-white">Questions & Answers</h3>
          </div>
          <div className="ml-auto w-[75%]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value} className="border-zinc-800">
                  <AccordionTrigger className="text-zinc-200 hover:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-[#191919] px-6 py-12 text-center">
          <p className="text-zinc-400">Show your team how fast visual planning can be.</p>
          <h3 className="text-3xl font-semibold text-white mt-2">Start building your next board</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={user ? boardHref : loginHref}
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors"
            >
              {user ? "Open board" : "Create an account"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#features" className="inline-flex items-center h-10 px-6 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
              Learn more
            </Link>
          </div>
        </section>
          
      </main>
       <Footer />
    </div>
  );
}
