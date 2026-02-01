"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Minus,
  Activity,
  ArrowRight,
  Settings,
  Layout,
  MousePointer2,
} from "lucide-react";
import ColorPicker from "../edges/ColorePicker";
import ToolbarOptions from "./ToolbarOptions";
import AccountSettings from "./AccountSettings";
import GeneralSettings from "./GeneralSettings";

// Colors from EdgeSettingsSidebar

const STROKE_WIDTHS = [
  { label: "Thin", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Thick", value: 4 },
];

const SettingsActionButton = React.forwardRef(
  (
    { icon: Icon, label, active, children, className, onClick, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-all duration-200
        border border-transparent cursor-pointer
        ${
          active
            ? "bg-[#333333] text-zinc-100 border-zinc-600/50"
            : "text-zinc-400 hover:bg-[#333333]/50 hover:text-zinc-200 hover:border-zinc-700"
        }
        ${className}
      `}
      {...props}
    >
      {children ? children : Icon && <Icon className="w-4 h-4 text-current" />}
      <span className="font-medium mr-auto">{label}</span>
      {active && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
    </div>
  ),
);
SettingsActionButton.displayName = "SettingsActionButton";

export default function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}) {
  const [edgeDefaults, setEdgeDefaults] = useState({
    stroke: "#71717a",
    strokeWidth: 2,
    animated: false,
    strokeDasharray: "0", // "0" or "5 5"
  });

  const [selectedTools, setSelectedTools] = useState([
    "note",
    "link",
    "todo",
    "line",
    "board",
    "column",
    "comment",
    "table",
    "add_image",
    "upload",
    "draw",
  ]);

  const toggleTool = (toolId) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  };

  const resetTools = () => {
    setSelectedTools([
      "note",
      "link",
      "todo",
      "line",
      "board",
      "column",
      "comment",
      "table",
      "add_image",
      "upload",
      "draw",
    ]);
  };

  const updateEdgeDefault = (key, value) => {
    setEdgeDefaults((prev) => ({ ...prev, [key]: value }));
  };

  const isDashed = edgeDefaults.strokeDasharray === "5 5";

  const handleContentInteract = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl bg-zinc-950 p-0 overflow-hidden shadow-2xl sm:rounded-xl"
        onInteractOutside={(e) => {}}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application preferences, edge styles, and account
            settings.
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex h-[600px] flex-col"
          onClick={handleContentInteract}
        >
          <Tabs
            defaultValue="defaults"
            className="flex-1 flex flex-col min-h-0 bg-[#232323]"
          >
            <div className="px-6 pt-4">
              <TabsList className="p-1 w-full justify-start h-auto rounded-lg bg-[#303030] gap-1">
                <TabsTrigger
                  value="general"
                  className="
          px-4 py-2 rounded-md font-medium transition-all
          text-zinc-400
          hover:text-zinc-100 hover:bg-zinc-800/70
          data-[state=active]:bg-zinc-800
          data-[state=active]:text-white
        "
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="defaults"
                  className="
          px-4 py-2 rounded-md font-medium transition-all
          text-zinc-400
          hover:text-zinc-100 hover:bg-zinc-800/70
          data-[state=active]:bg-zinc-800
          data-[state=active]:text-white
        "
                >
                  Defaults
                </TabsTrigger>

                <TabsTrigger
                  value="account"
                  className="
          px-4 py-2 rounded-md font-medium transition-all
          text-zinc-400
          hover:text-zinc-100 hover:bg-zinc-800/70
          data-[state=active]:bg-zinc-800
          data-[state=active]:text-white
        "
                >
                  Account
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="defaults"
              className="flex-1 overflow-y-auto px-6 py-4 focus-visible:outline-none min-h-0 custom-scrollbar"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-1">
                    Global Preferences
                  </h3>
                  <p className="text-xs text-zinc-300 mb-4">
                    Set default properties for new items created on the canvas.
                  </p>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                    defaultValue="edges"
                  >
                    {/* Edges Defaults */}
                    <AccordionItem
                      value="edges"
                      className="border-none rounded-lg overflow-hidden bg-[#2A2A2A] data-[state=open]:bg-[#2A2A2A] transition-colors"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#333333] text-zinc-200">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-zinc-400" />
                          <span>Edge Styles</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-4 pt-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1">
                            <Label className="text-xs text-zinc-300 mb-2 block">
                              Default Color
                            </Label>
                            <ColorPicker
                              value={edgeDefaults.stroke}
                              onChange={(color) =>
                                updateEdgeDefault("stroke", color)
                              }
                            >
                              <button className="flex items-center justify-between w-full h-9 px-3 py-2 border border-zinc-700/50 rounded-md hover:border-zinc-600 transition-colors">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded-full border border-zinc-700"
                                    style={{
                                      backgroundColor: edgeDefaults.stroke,
                                    }}
                                  />
                                  <span className="text-sm text-zinc-300 font-mono">
                                    {edgeDefaults.stroke}
                                  </span>
                                </div>
                              </button>
                            </ColorPicker>
                          </div>

                          <div className="col-span-1">
                            <Label className="text-xs text-zinc-300 mb-2 block">
                              Stroke Style
                            </Label>
                            <div className="flex items-center gap-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button className="flex-1 min-w-0 flex items-center justify-center gap-2 h-9 px-3 py-2 border border-zinc-700/50 rounded-md text-zinc-300 hover:border-zinc-600 text-sm">
                                    <div
                                      className="w-8 bg-current rounded-full transition-all"
                                      style={{
                                        height: edgeDefaults.strokeWidth,
                                      }}
                                    />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-40 bg-[#1e1e1e] border-zinc-800 p-1"
                                  side="bottom"
                                >
                                  {STROKE_WIDTHS.map((sw) => (
                                    <button
                                      key={sw.label}
                                      onClick={() =>
                                        updateEdgeDefault(
                                          "strokeWidth",
                                          sw.value,
                                        )
                                      }
                                      className={`flex items-center gap-3 px-2 py-2 w-full rounded-md text-sm transition-colors
                                                ${edgeDefaults.strokeWidth === sw.value ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50"}
                                            `}
                                    >
                                      <div
                                        className="w-8 bg-current rounded-full"
                                        style={{ height: sw.value }}
                                      />
                                      <span className="text-xs ml-auto">
                                        {sw.label}
                                      </span>
                                    </button>
                                  ))}
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>

                        {/* Animated Toggle */}
                        <div className="pt-1">
                          <SettingsActionButton
                            icon={Activity}
                            label="Animated Edges"
                            active={edgeDefaults.animated}
                            onClick={() =>
                              updateEdgeDefault(
                                "animated",
                                !edgeDefaults.animated,
                              )
                            }
                            className="justify-between group"
                          >
                            <Switch
                              checked={edgeDefaults.animated}
                              onCheckedChange={(c) =>
                                updateEdgeDefault("animated", c)
                              }
                              onClick={(e) => e.stopPropagation()}
                            />
                          </SettingsActionButton>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="toolbar"
                      className="border-none rounded-lg overflow-hidden bg-[#2A2A2A] data-[state=open]:bg-[#2A2A2A] transition-colors"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#333333] text-zinc-200">
                        <div className="flex items-center gap-2">
                          <MousePointer2 className="w-4 h-4 text-zinc-400" />
                          <span>Toolbar Options</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-4">
                        <ToolbarOptions
                          selectedTools={selectedTools}
                          onToggleTool={toggleTool}
                          onReset={resetTools}
                        />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="nodes"
                      className="border-none rounded-lg overflow-hidden bg-[#2A2A2A] data-[state=open]:bg-[#2A2A2A] transition-colors"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#333333] text-zinc-200">
                        <div className="flex items-center gap-2">
                          <Layout className="w-4 h-4 text-zinc-500" />
                          <span>Node Styles</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-4 text-zinc-500 text-sm">
                        Node default settings are not yet implemented.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="general"
              className="flex-1 p-6 overflow-y-auto min-h-0 custom-scrollbar"
            >
              <GeneralSettings
                settings={settings}
                onSettingsChange={onSettingsChange}
              />
            </TabsContent>
            <TabsContent
              value="account"
              className="flex-1 p-6 overflow-y-auto min-h-0 custom-scrollbar"
            >
              <AccountSettings />
            </TabsContent>
          </Tabs>

          <div className="p-6 border-t border-zinc-800 bg-[#232323] flex justify-end gap-3 z-10">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-400"
            >
              Cancel
            </Button>
            <Button className="bg-zinc-100 text-zinc-900 hover:bg-white font-medium px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
