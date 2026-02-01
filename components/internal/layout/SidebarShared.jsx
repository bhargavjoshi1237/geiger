"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import ColorPicker from "../edges/ColorePicker";

/**
 * Common Sidebar Button with built-in tooltip and hover animations
 */
export const SidebarButton = React.forwardRef(
  (
    { icon: Icon, label, active, onClick, className, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      onClick={onClick}
      className={`p-3 rounded-lg transition-colors group relative flex items-center justify-center 
    ${active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}
    ${className || ""}
    `}
      {...props}
    >
      {children ||
        (Icon && (
          <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        ))}
      <span
        className="
        absolute left-[calc(100%+12px)] 
        bg-white text-black text-[11px] font-semibold 
        px-2.5 py-1.5 rounded-md 
        opacity-0 group-hover:opacity-100 
        pointer-events-none whitespace-nowrap z-50 
        transition-all duration-200 
        translate-x-[-10px] group-hover:translate-x-0
        shadow-[0_8px_30px_rgb(0,0,0,0.5)]
        z-[100]
      "
      >
        {label}
        {/* Tooltip Arrow */}
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
      </span>
    </button>
  ),
);
SidebarButton.displayName = "SidebarButton";

/**
 * Standard Sidebar Header with Back Button and Divider
 */
export const SidebarHeader = ({ onBack, label = "Back" }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-full flex justify-center pb-2 pt-2">
      <SidebarButton icon={ArrowLeft} label={label} onClick={onBack} />
    </div>
    <div className="w-full px-4 py-2">
      <div className="w-full h-[1px] bg-zinc-700"></div>
    </div>
  </div>
);

/**
 * Reusable Color Picker wrapper for Sidebars
 */
export const SidebarColorOption = ({
  value,
  onChange,
  label = "Color",
  side = "right",
  align = "start",
}) => (
  <ColorPicker value={value} onChange={onChange} side={side} align={align}>
    <div>
      <SidebarButton
        label={label}
        icon={() => (
          <div
            className="w-5 h-5 rounded border border-zinc-600 shadow-sm"
            style={{ backgroundColor: value || "#333333" }}
          />
        )}
      />
    </div>
  </ColorPicker>
);

/**
 * Simple container for grouping items
 */
export const SidebarSection = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-1 w-full items-center px-2 ${className}`}>
    {children}
  </div>
);
