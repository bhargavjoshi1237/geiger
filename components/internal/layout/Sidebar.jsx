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

const SidebarItem = ({ icon: Icon, label, active, onDragStart, draggable }) => (
  <button
    draggable={draggable}
    onDragStart={onDragStart}
    className={`p-3 rounded-lg transition-colors group relative flex items-center justify-center ${active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
  >
    <Icon className="w-5 h-5" />
    <span className="absolute left-14 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg">
      {label}
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
    </span>
  </button>
);

const MainSidebarContent = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <nav className="flex-1 flex flex-col gap-1 w-full px-2 items-center pt-2">
      <SidebarItem
        icon={StickyNote}
        label="Note"
        draggable
        onDragStart={(event) => onDragStart(event, "custom")}
      />
      <SidebarItem
        icon={Link}
        label="Link"
        draggable
        onDragStart={(event) => onDragStart(event, "link")}
      />
      <SidebarItem icon={CheckSquare} label="To-do" />
      <SidebarItem icon={Minus} label="Line" />
      <SidebarItem icon={LayoutDashboard} label="Board" />
      <SidebarItem icon={Columns} label="Column" />

      <SidebarItem
        icon={MessageSquare}
        label="Comment"
        draggable
        onDragStart={(event) => onDragStart(event, "comment")}
      />
      <SidebarItem icon={Table} label="Table" />
      <SidebarItem icon={MoreHorizontal} label="More" />

      <div className="w-full px-4 py-2">
        <div className="w-full h-[1px] bg-zinc-700"></div>
      </div>
      <SidebarItem icon={ImageIcon} label="Add Image" />
      <SidebarItem icon={Upload} label="Upload" />
      <SidebarItem icon={PenTool} label="Draw" />
      <div className="mt-auto flex flex-col gap-4 items-center w-full pb-2">
        <SidebarItem icon={Trash2} label="Trash" />
      </div>
    </nav>
  );
};

import EdgeSettingsSidebar from "./EdgeSettingsSidebar";
import NodeSettingsSidebar from "./NodeSettingsSidebar";
import { useEffect, useState } from "react";

export default function Sidebar({
  selectedEdge,
  onUpdateEdge,
  onDeselect,
  selectedNode,
  onUpdateNode,
  onDeselectNode,
}) {
  const [cachedSelectedEdge, setCachedSelectedEdge] = useState(selectedEdge);
  const [cachedSelectedNode, setCachedSelectedNode] = useState(selectedNode);

  useEffect(() => {
    if (selectedEdge) {
      setCachedSelectedEdge(selectedEdge);
    }
  }, [selectedEdge]);

  useEffect(() => {
    if (selectedNode) {
      setCachedSelectedNode(selectedNode);
    }
  }, [selectedNode]);

  let activePanel = "main";
  if (selectedEdge) activePanel = "edge";
  else if (selectedNode) activePanel = "node";

  const edgeToRender = selectedEdge || cachedSelectedEdge;
  const nodeToRender = selectedNode || cachedSelectedNode;

  return (
    <div className="h-full w-18 bg-[#1e1e1e] flex flex-col items-center shrink-0 z-50 border-r border-zinc-800 relative overflow-hidden">
      <div
        className={`absolute inset-0 flex flex-col py-4 w-full h-full transition-transform duration-300 ease-in-out bg-[#1e1e1e] ${
          activePanel === "main" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MainSidebarContent />
      </div>
      <div
        className={`absolute inset-0 flex flex-col py-4 w-full h-full transition-transform duration-300 ease-in-out bg-[#1e1e1e] ${
          activePanel === "edge" ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {edgeToRender && (
          <EdgeSettingsSidebar
            selectedEdge={edgeToRender}
            onUpdateEdge={onUpdateEdge}
            onBack={onDeselect}
          />
        )}
      </div>
      <div
        className={`absolute inset-0 flex flex-col py-4 w-full h-full transition-transform duration-300 ease-in-out bg-[#1e1e1e] ${
          activePanel === "node" ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nodeToRender && (
          <NodeSettingsSidebar
            selectedNode={nodeToRender}
            onUpdateNode={onUpdateNode}
            onBack={onDeselectNode}
          />
        )}
      </div>
    </div>
  );
}
