"use client";

import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { SidebarShell } from "./SidebarPrimitives";
import { ColorPlug } from "./plugs/ColorPlug";
import { ReactionPlug } from "./plugs/ReactionPlug";
import { ActionPlug } from "./plugs/ActionPlug";

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

  const handleAddReaction = (emoji) => {
    const currentReactions = selectedNode.data?.reactions || {};
    const newCount = (currentReactions[emoji] || 0) + 1;
    updateData({ reactions: { ...currentReactions, [emoji]: newCount } });
  };

  return (
    <SidebarShell onBack={onBack} title="Node Settings">
      <ColorPlug
        value={currentColor}
        onChange={(color) => updateData({ backgroundColor: color })}
        label="Card Color"
      />

      <ReactionPlug onReaction={handleAddReaction} />

      <ActionPlug
        icon={MessageSquarePlus}
        label="Comment"
        onClick={() => console.log("Comment")}
      />
    </SidebarShell>
  );
}
