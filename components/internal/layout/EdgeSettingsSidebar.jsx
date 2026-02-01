"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Type,
  Minus,
  AlignJustify,
  Activity,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MarkerType } from "@xyflow/react";

const STROKE_WIDTHS = [
  { label: "Thin", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Thick", value: 4 },
];

export default function EdgeSettingsSidebar({
  selectedEdge,
  onUpdateEdge,
  onBack,
}) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (selectedEdge) {
      setLabel(selectedEdge.label || selectedEdge.data?.label || "");
    }
  }, [selectedEdge]);

  if (!selectedEdge) return null;

  const updateStyle = (newStyle) => {
    onUpdateEdge(selectedEdge.id, {
      style: { ...selectedEdge.style, ...newStyle },
    });
  };

  const updateMarker = (side) => {
    const markerKey = side === "start" ? "markerStart" : "markerEnd";
    const currentMarker = selectedEdge[markerKey];
    const newValue = currentMarker
      ? undefined
      : {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: selectedEdge.style?.stroke,
        };

    onUpdateEdge(selectedEdge.id, { [markerKey]: newValue });
  };

  const currentStrokeWidth = selectedEdge.style?.strokeWidth || 1;
  const isDashed = selectedEdge.style?.strokeDasharray === "5 5";

  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <SidebarHeader onBack={onBack} />

      <SidebarSection>
        <SidebarColorOption
          value={selectedEdge.style?.stroke}
          onChange={(color) => updateStyle({ stroke: color })}
        />

        <SidebarButton
          icon={ArrowLeft}
          label="Start Arrow"
          active={!!selectedEdge.markerStart}
          onClick={() => updateMarker("start")}
        />
        <SidebarButton
          icon={ArrowRight}
          label="End Arrow"
          active={!!selectedEdge.markerEnd}
          onClick={() => updateMarker("end")}
        />
        <Popover>
          <PopoverTrigger asChild>
            <SidebarButton icon={Type} label="Label" active={!!label} />
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={8}
            className="w-72 bg-[#1e1e1e] border-zinc-800 p-4 shadow-2xl rounded-xl"
          >
            <div className="flex flex-col gap-3">
              <Label className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                Label Text
              </Label>
              <div className="relative">
                <Input
                  className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-zinc-700/20 transition-all font-medium"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                    onUpdateEdge(selectedEdge.id, { label: e.target.value });
                  }}
                  placeholder="Type something..."
                  autoFocus
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <SidebarButton
          icon={Minus}
          label="Dashed Line"
          active={isDashed}
          onClick={() =>
            updateStyle({ strokeDasharray: isDashed ? "0" : "5 5" })
          }
          className={isDashed ? "" : "opacity-80"}
        >
          <Minus
            className={`w-5 h-5 ${isDashed ? "-rotate-45" : ""} transition-transform duration-300`}
          />
        </SidebarButton>

        <Popover>
          <PopoverTrigger asChild>
            <SidebarButton icon={AlignJustify} label="Stroke Weight" />
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={8}
            className="w-40 bg-[#1e1e1e] border-zinc-800 p-1 shadow-xl rounded-xl"
          >
            <div className="flex flex-col gap-0.5">
              <Label className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                Thickness
              </Label>
              {STROKE_WIDTHS.map((sw) => (
                <button
                  key={sw.label}
                  onClick={() => updateStyle({ strokeWidth: sw.value })}
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors
                    ${currentStrokeWidth === sw.value ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"}
                `}
                >
                  <div
                    className="w-12 bg-current rounded-full transition-all"
                    style={{ height: sw.value }}
                  />
                  <span className="text-xs">{sw.label}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <SidebarButton
          icon={Activity}
          label="Animated"
          active={selectedEdge.animated}
          onClick={() =>
            onUpdateEdge(selectedEdge.id, { animated: !selectedEdge.animated })
          }
          className={
            selectedEdge.animated ? "text-green-400 bg-zinc-800/50" : ""
          }
        />
      </SidebarSection>
    </div>
  );
}
