"use client";

import React, { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { SidebarShell } from "./SidebarPrimitives";
import { ColorPlug } from "./plugs/ColorPlug";
import { ReactionPlug } from "./plugs/ReactionPlug";
import { ActionPlug } from "./plugs/ActionPlug";
import { EditBoardNamePlug } from "./plugs/EditBoardNamePlug";
import EditBoardNameDialog from "./dialogs/EditBoardNameDialog";
import { toast } from "sonner";

export default function NodeSettingsSidebar({
  selectedNode,
  onUpdateNode,
  onBack,
}) {
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

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

  const handleSaveBoardName = async (newName) => {
    updateData({ label: newName, name: newName });

    if (selectedNode.type === "board" && selectedNode.data.boardId) {
      try {
        const response = await fetch("/api/update-board", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            boardId: selectedNode.data.boardId,
            name: newName,
          }),
        });
        if (!response.ok) throw new Error("Failed to update board name");
        toast.success("Board name updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to save board name to server");
      }
    }
  };

  return (
    <>
      <SidebarShell onBack={onBack} title="Node Settings">
        {selectedNode.type === "board" && (
          <EditBoardNamePlug
            currentName={selectedNode.data.label}
            onEdit={() => setIsEditNameOpen(true)}
          />
        )}

        <ColorPlug
          value={currentColor}
          onChange={(color) => updateData({ backgroundColor: color })}
          label="Card Color"
        />

        {selectedNode.type !== "board" && (
          <ReactionPlug onReaction={handleAddReaction} />
        )}

        {selectedNode.type !== "board" && (
          <ActionPlug
            icon={MessageSquarePlus}
            label="Comment"
            onClick={() => console.log("Comment")}
          />
        )}
      </SidebarShell>

      {selectedNode.type === "board" && (
        <EditBoardNameDialog
          open={isEditNameOpen}
          onOpenChange={setIsEditNameOpen}
          initialName={selectedNode.data.label}
          onSave={handleSaveBoardName}
        />
      )}
    </>
  );
}
