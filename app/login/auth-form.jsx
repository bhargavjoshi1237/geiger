"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "./actions";
import { toast } from "sonner";
import { Github, Mail, Loader2 } from "lucide-react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showPassword = email.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setIsLoading(false);
      toast(result.error);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            Login to Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to Login your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 px-1">
            <Input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-zinc-900 text-white placeholder:text-zinc-500"
            />
          </div>

          <div
            className={`grid transition-all duration-300  ease-in-out ${
              showPassword
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden px-1">
              <div className="py-2 space-y-4">
                <Input
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required={showPassword}
                  className="h-11 bg-zinc-900 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 px-1 relative overflow-hidden transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Signing In...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                <Mail className="h-4 w-4" />
                <span>Sign In with Email</span>
              </div>
            )}

            {/* Fancy background loading effect */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/10 animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]" />
            )}
          </Button>
        </form>

        <div className="flex items-center gap-4 px-1">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-[#656565]">Or Continue With</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <Button
          variant="outline"
          className="w-full h-11 border-zinc-800 bg-transparent text-white hover:bg-zinc-900 px-1"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        <p className="text-xs text-[#656565]">
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
