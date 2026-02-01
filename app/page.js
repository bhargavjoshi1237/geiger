import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 dark:from-blue-600/30 dark:via-transparent dark:to-cyan-600/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl" />
      
      <main className="relative z-10 flex flex-col items-center gap-8 p-10 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to Mila
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">
          A powerful workspace for your ideas. Sign in to continue.
        </p>
        
        <div className="flex gap-4 mt-4">
          <Link 
            href="/login"
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-medium transition hover:opacity-80"
          >
            Sign In
          </Link>
          {/* <Link 
            href="/signup"
            className="rounded-full border border-gray-300 dark:border-gray-700 px-8 py-3 font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            Sign Up
          </Link> */}
        </div>
      </main>
    </div>
  );
}
