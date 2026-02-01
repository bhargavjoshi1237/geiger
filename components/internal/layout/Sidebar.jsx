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

const SidebarItem = ({ icon: Icon, label, active }) => (
  <button
    className={`p-3 rounded-lg transition-colors group relative flex items-center justify-center ${active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
  >
    <Icon className="w-5 h-5" />
    <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
      {label}
    </span>
  </button>
);

export default function Sidebar() {
  return (
    <div className="h-full w-18 bg-[#1e1e1e] flex flex-col items-center py-4 shrink-0 z-50">
      <nav className="flex-1 flex flex-col gap-1 w-full px-2 items-center">
        <SidebarItem icon={StickyNote} label="Note" />
        <SidebarItem icon={Link} label="Link" />
        <SidebarItem icon={CheckSquare} label="To-do" />
        <SidebarItem icon={Minus} label="Line" />
        <SidebarItem icon={LayoutDashboard} label="Board" />
        <SidebarItem icon={Columns} label="Column" />
        <SidebarItem icon={MessageSquare} label="Comment" />
        <SidebarItem icon={Table} label="Table" />
        <SidebarItem icon={MoreHorizontal} label="More" />

        <div className="w-full px-4 py-2">
          <div className="w-full h-[1px] bg-zinc-700"></div>
        </div>

        <SidebarItem icon={ImageIcon} label="Add Image" />
        <SidebarItem icon={Upload} label="Upload" />
        <SidebarItem icon={PenTool} label="Draw" />
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-4 items-center w-full pb-2">
        <SidebarItem icon={Trash2} label="Trash" />
      </div>
    </div>
  );
}
