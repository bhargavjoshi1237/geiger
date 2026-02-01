"use client";

import React from "react";
import { MessageSquarePlus, SmilePlus } from "lucide-react";
import {
  SidebarButton,
  SidebarHeader,
  SidebarColorOption,
  SidebarSection,
} from "./SidebarShared";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NodeSettingsSidebar({
  selectedNode,
  onUpdateNode,
  onBack,
}) {
  if (!selectedNode) return null;

  const updateData = (newData) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, ...newData },
    });
  };

  const currentColor = selectedNode.data?.backgroundColor || "#333333";
  const commonEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡", "🎉", "🔥"];

  const handleAddReaction = (emoji) => {
    const currentReactions = selectedNode.data?.reactions || {};
    const newCount = (currentReactions[emoji] || 0) + 1;
    updateData({ reactions: { ...currentReactions, [emoji]: newCount } });
  };

  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <SidebarHeader onBack={onBack} />

      <SidebarSection>
        <SidebarColorOption
          value={currentColor}
          onChange={(color) => updateData({ backgroundColor: color })}
          label="Card Color"
        />

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
                  onClick={() => handleAddReaction(emoji)}
                >
                  <span className="drop-shadow-sm">{emoji}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <SidebarButton
          icon={MessageSquarePlus}
          label="Comment"
          onClick={() => console.log("Comment")}
        />
      </SidebarSection>
    </div>
  );
}
