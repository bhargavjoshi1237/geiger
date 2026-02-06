"use client";

import React from "react";
import {
  StickyNote,
  Link,
  CheckSquare,
  Minus,
  LayoutDashboard,
  Columns,
  MessageSquare,
  Table,
  MoreHorizontal,
  Trash2,
  Image as ImageIcon,
  Upload,
  PenTool,
} from "lucide-react";
import { SidebarButton } from "./SidebarPrimitives";

export const MainSidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <nav className="flex-1 flex flex-col gap-3 w-full px-2 items-center pt-2">
      <SidebarButton
        icon={StickyNote}
        label="Note"
        draggable
        onDragStart={(event) => onDragStart(event, "custom")}
      />
      <SidebarButton
        icon={Link}
        label="Link"
        draggable
        onDragStart={(event) => onDragStart(event, "link")}
      />
      <SidebarButton icon={CheckSquare} label="To-do" />
      <SidebarButton icon={Minus} label="Line" />
      <SidebarButton icon={LayoutDashboard} label="Board" />
      <SidebarButton icon={Columns} label="Column" />

      <SidebarButton
        icon={MessageSquare}
        label="Comment"
        draggable
        onDragStart={(event) => onDragStart(event, "comment")}
      />
      <SidebarButton icon={Table} label="Table" />
      <SidebarButton icon={MoreHorizontal} label="More" />

      <div className="w-full px-2 py-2">
        <div className="w-full h-[1px] bg-zinc-700"></div>
      </div>
      <SidebarButton icon={ImageIcon} label="Add Image" />
      <SidebarButton icon={Upload} label="Upload" />
      <SidebarButton icon={PenTool} label="Draw" />
      <div className="mt-auto flex flex-col gap-4 items-center w-full pb-2">
        <SidebarButton icon={Trash2} label="Trash" />
      </div>
    </nav>
  );
};
