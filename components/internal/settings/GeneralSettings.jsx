"use client";

import React from "react";
import {
  Database,
  HardDrive,
  Info,
  MousePointerClick,
  RefreshCcw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function GeneralSettings({ settings, onSettingsChange }) {
  // Mock usage data
  const usage = {
    nodes: 540,
    maxNodes: 1000,
    projects: 3,
    maxProjects: 10,
    storage: "1.2 GB",
    maxStorage: "5 GB",
  };

  const nodePercentage = (usage.nodes / usage.maxNodes) * 100;
  const storagePercentage = 24; // 1.2 / 5 * 100

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="items-center gap-2">
          <h3 className="text-sm font-medium text-zinc-300">
            General Information
          </h3>
          <p className="text-xs text-zinc-400">
            System status and usage metrics.
          </p>
        </div>
        <div className="flex items-center  gap-2">
          <div className="p-2 rounded-md bg-zinc-800 text-zinc-300">
            <RefreshCcw className="h-4 w-4" />
          </div>
          <div className="p-2 rounded-md bg-zinc-800 text-zinc-300">
            <HardDrive className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-zinc-400" />
            <h4 className="text-sm font-medium text-zinc-200">System Usage</h4>
          </div>
        </div>

        <div className="px-5 py-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Nodes in Canvas</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-200">
                  {usage.nodes.toLocaleString()}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-500">
                  {usage.maxNodes.toLocaleString()}
                </span>
              </div>
            </div>
            <Progress
              value={nodePercentage}
              className="h-2 bg-zinc-800"
              indicatorClassName={
                nodePercentage > 90 ? "bg-red-500" : "bg-blue-500"
              }
            />
            <p className="text-[11px] text-zinc-500">
              You have used {Math.round(nodePercentage)}% of your node allowance
              is available on the basic plan.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs mt-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 font-medium">Storage Used</span>
                <Info className="w-3 h-3 text-zinc-600 cursor-help" />
              </div>
              <span className="text-zinc-400">{usage.storage} used</span>
            </div>
            <div className="flex items-center gap-1 h-3 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-zinc-100/80"
                style={{ width: "15%" }}
                title="Images"
              />
              <div
                className="h-full bg-zinc-400/80"
                style={{ width: "8%" }}
                title="Documents"
              />
              <div className="h-full bg-zinc-600/50" style={{ width: "77%" }} />{" "}
              {/* Remaining */}
            </div>
            <div className="flex gap-4 text-[10px] text-zinc-100/80">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-100/80" />
                <span>Media</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-400/80" />
                <span>Docs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-600/50" />
                <span>Free Space</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Settings */}
      <div className="bg-[#2A2A2A] rounded-lg border border-zinc-800/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-zinc-800 text-zinc-300">
              <MousePointerClick className="w-4 h-4" />
            </div>
            <div>
              <Label
                htmlFor="double-click-insert"
                className="text-sm font-medium text-zinc-200 cursor-pointer"
              >
                Double Click to Insert Node
              </Label>
              <p className="text-xs text-zinc-500">
                Fast way to add new cards on canvas
              </p>
            </div>
          </div>
          <Switch
            id="double-click-insert"
            checked={settings?.doubleClickToInsert}
            onCheckedChange={(checked) =>
              onSettingsChange?.("doubleClickToInsert", checked)
            }
          />
        </div>
      </div>

      {/* Example of another general setting block */}
      <div className="bg-[#2A2A2A] rounded-lg border border-zinc-800/50 p-4 flex items-center justify-between">
        <div className="space-y-0.5">
          <h5 className="text-sm font-medium text-zinc-200">Local Cache</h5>
          <p className="text-xs text-zinc-500">
            Clear temporary files to free up space
          </p>
        </div>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-zinc-800 border-zinc-700 text-zinc-400 font-normal"
        >
          Clear Cache
        </Badge>
      </div>
    </div>
  );
}
