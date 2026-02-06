"use client";

import React from "react";
import { SmilePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarButton } from "../SidebarPrimitives";

export const ReactionPlug = ({ onReaction, emojis }) => {
  const commonEmojis = emojis || [
    "👍",
    "❤️",
    "😂",
    "😮",
    "😢",
    "😡",
    "🎉",
    "🔥",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarButton icon={SmilePlus} label="Add reaction" />
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-2 bg-zinc-900/90 backdrop-blur-xl border-zinc-700/50 shadow-2xl rounded-xl"
        side="right"
        align="start"
        sideOffset={12}
      >
        <div className="grid grid-cols-4 gap-1.5 p-1">
          {commonEmojis.map((emoji) => (
            <button
              key={emoji}
              className="
                text-xl hover:bg-zinc-800 p-2.5 rounded-lg 
                transition-all duration-200 hover:scale-110 
                active:scale-95 flex items-center justify-center
              "
              onClick={() => onReaction(emoji)}
            >
              <span className="drop-shadow-sm">{emoji}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
