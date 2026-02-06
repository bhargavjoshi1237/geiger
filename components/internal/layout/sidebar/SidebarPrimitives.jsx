"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

/**
 * SidebarButton
 * Minimalist version.
 * - Removes bold borders and glows.
 * - Relies on subtle background shifts for hover.
 * - Tooltip is understated and precise.
 */
export const SidebarButton = React.forwardRef(
  (
    { icon: Icon, label, active, onClick, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        type="button"
        className={`
          relative group flex items-center justify-center p-2 rounded-lg
          transition-all duration-150 ease-in-out
          outline-none
          
          /* --- Light Mode Interaction --- */
          text-zinc-500 hover:text-zinc-900 
          hover:bg-zinc-100 
          
          /* --- Dark Mode Interaction (Default) --- */
          dark:text-zinc-400 dark:hover:text-zinc-100 
          dark:hover:bg-zinc-800/60
          
          /* --- Active State --- */
          ${
            active
              ? "bg-zinc-200/50 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
              : "bg-transparent"
          }

          /* --- Micro-interaction on Click --- */
          active:scale-[0.97]
          
          ${className || ""}
        `}
        {...props}
      >
        <div className="flex items-center justify-center relative z-10">
          {children ||
            (Icon && <Icon className="w-5 h-5" strokeWidth={1.75} />)}
        </div>

        {/* Minimalist Tooltip */}
        {label && (
          <span
            className="
              absolute left-full ml-2
              px-2.5 py-1
              rounded-md
              text-[12px] font-medium
              whitespace-nowrap z-50
              pointer-events-none
              
              /* Animation: Simple Fade & subtle slide */
              opacity-0 -translate-x-1 
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200 ease-out
              
              /* Visuals */
              bg-zinc-900 text-zinc-100 
              dark:bg-zinc-800 dark:text-zinc-100 dark:border dark:border-zinc-700
              shadow-sm
            "
          >
            {label}
          </span>
        )}
      </button>
    );
  },
);

SidebarButton.displayName = "SidebarButton";

/**
 * SidebarHeader
 * Clean and flat.
 */
export const SidebarHeader = ({ onBack, label = "Back" }) => (
  <div className="w-full flex flex-col items-center pt-4 pb-2">
    <div className="w-full flex justify-center mb-2">
      <SidebarButton
        icon={ArrowLeft}
        label={label}
        onClick={onBack}
        className="w-10 h-10 bg-zinc-800/40 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/60 border border-transparent hover:border-zinc-700"
      />
    </div>
    {/* Subtle Divider */}
    <div className="w-full px-2 opacity-50">
      <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
    </div>
  </div>
);

/**
 * SidebarSection
 */
export const SidebarSection = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-3 w-full items-center px-2 ${className}`}>
    {children}
  </div>
);

/**
 * SidebarShell
 * Neutral background colors.
 */
export const SidebarShell = ({ children, onBack, title }) => (
  <div className="flex flex-col w-full h-full bg-transparent transition-colors duration-300">
    <SidebarHeader onBack={onBack} label={title} />
    <nav className="flex-1 overflow-y-auto py-2 scrollbar-none">
      <SidebarSection>{children}</SidebarSection>
    </nav>
  </div>
);
