import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  Keyboard,
  FileText,
  Bug,
  ExternalLink,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HelpDialog({ open, onOpenChange }) {
  const helpItems = [
    {
      id: "shortcuts",
      title: "Keyboard Shortcuts",
      description: "Speed up your workflow with these hotkeys",
      icon: Keyboard,
      action: "View",
    },
    {
      id: "docs",
      title: "Documentation",
      description: "Learn everything about our features",
      icon: FileText,
      action: "Read",
    },
    {
      id: "bug",
      title: "Report a Bug",
      description: "Found something broken? Let us know",
      icon: Bug,
      action: "Report",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1e1e1e] border-zinc-800 text-zinc-100 p-0 overflow-hidden shadow-xl sm:rounded-lg">
        <DialogHeader className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-zinc-400" />
            <DialogTitle className="text-base font-medium text-zinc-100">
              Help & Support
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-zinc-800/50">
            {helpItems.map((item) => (
              <div
                key={item.id}
                className="p-4 flex gap-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer"
              >
                <div className="mt-1">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-600 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </p>
                    <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-6 text-center">
              <p className="text-[10px] text-zinc-600">Version 1.0.0-beta</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
