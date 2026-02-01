"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { toast } from "sonner";
import { Github } from "lucide-react";

export function AuthForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      toast(result.error);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
          />

          <Button type="submit" className="w-full h-11">
            Sign In with Email
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-muted-foreground">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* GitHub button */}
        <Button
          variant="outline"
          className="w-full h-11 border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
