"use client";

import React from "react";
import {
  User,
  Mail,
  Shield,
  CreditCard,
  LogOut,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountSettings() {
  // Mock user data - normally this would come from your auth context
  const user = {
    name: "Bhargav Joshi",
    email: "bhargav.joshi@example.com",
    avatarUrl: null, // or a URL string
    plan: "Pro",
    memberSince: "Jan 2024",
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-zinc-300">Account Details</h3>
        <p className="text-xs text-zinc-400">
          Manage your profile and subscription.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#2A2A2A] rounded-lg p-5 flex items-start gap-4 border border-zinc-800/50">
        <Avatar className="h-16 w-16 border-2 border-zinc-700">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xl font-medium">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-zinc-100">{user.name}</h4>
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-2 py-0.5 text-xs"
            >
              {user.plan} Plan
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>{user.email}</span>
          </div>
          <p className="text-xs text-zinc-500 pt-1">
            Member since {user.memberSince}
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-4">
        {/* Subscription / Plan */}
        <div className="bg-[#2A2A2A] rounded-lg p-4 border border-zinc-800/50 flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-md bg-zinc-800 text-zinc-300">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-zinc-200">
                Subscription
              </h5>
              <p className="text-xs text-zinc-500">
                Manage billing and payment methods
              </p>
            </div>
          </div>

          <div className="pl-[52px] space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              <span>
                Next billing date: <strong>March 1, 2026</strong>
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600"
              >
                Manage Subscription
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-zinc-400 hover:text-white"
              >
                View History
              </Button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#2A2A2A] rounded-lg p-4 border border-zinc-800/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-zinc-800 text-zinc-300">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-zinc-200">Security</h5>
              <p className="text-xs text-zinc-500">
                Password and authentication
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-4 flex items-center justify-center">
        <Button variant="destructive" className="">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
