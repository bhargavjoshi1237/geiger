import React, { memo } from "react";
import {
  Handle,
  Position,
  NodeResizeControl,
  useReactFlow,
} from "@xyflow/react";
import { ArrowBigRight, ArrowRight } from "lucide-react";

const ResizeHandle = () => {
  return (
    <div className="absolute bottom-1 right-1 p-1">
      <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-50">
        <path
          d="M 6 10 L 10 6 L 10 10 Z"
          fill="currentColor"
          className="text-zinc-400"
        />
        <path
          d="M 2 10 L 10 2 L 10 4 L 4 10 Z"
          fill="currentColor"
          className="text-zinc-400"
        />
      </svg>
    </div>
  );
};

const CustomNode = ({ id, data, selected, dragging }) => {
  const { setNodes } = useReactFlow();

  return (
    <>
      <div
        className={`
            relative flex flex-col w-full h-full min-h-[68px] min-w-[338px] group
            bg-[#333333] transition-all duration-200
            ${selected ? "border-2 border-white" : "border-2 border-transparent hover:border-zinc-600"}
            ${dragging ? "shadow-2xl shadow-black/50 z-50" : ""}
        `}
      >
        <NodeResizeControl
          minWidth={338}
          minHeight={68}
          className="!bg-transparent !border-none"
          position="bottom-right"
          style={{
            opacity: 1,
            pointerEvents: "all",
          }}
          onResizeEnd={(_, params) => {
            setNodes((nodes) =>
              nodes.map((n) => {
                if (n.id === id) {
                  return {
                    ...n,
                    width: Math.round(params.width / 15) * 15,
                    height: Math.round(params.height / 15) * 15,
                    position: {
                      x: Math.round(params.x / 15) * 15,
                      y: Math.round(params.y / 15) * 15,
                    },
                  };
                }
                return n;
              }),
            );
          }}
        >
          <div
            className={`transition-opacity duration-200 ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          >
            <ResizeHandle />
          </div>
        </NodeResizeControl>

        <div className="flex-1 w-full h-full overflow-hidden flex items-center justify-center">
          {selected ? (
            <textarea
              className="w-full h-full p-4 text-start mt-[7px] bg-transparent resize-none outline-none text-zinc-300 placeholder:text-zinc-600 placeholder:text-start font-sans block"
              placeholder="Start typing..."
              value={data.label || ""}
              onChange={(evt) => {
                setNodes((nodes) =>
                  nodes.map((n) => {
                    if (n.id === id) {
                      return {
                        ...n,
                        data: {
                          ...n.data,
                          label: evt.target.value,
                        },
                      };
                    }
                    return n;
                  }),
                );
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
          ) : (
            <p
              className={`font-sans p-4 whitespace-pre-wrap text-start w-full ${
                data.label ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {data.label || "Start typing..."}
            </p>
          )}
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="!w-1 !-top-[1px] !h-1 !bg-transparent !border-0"
        />
        <Handle
          type="source"
          position={Position.Right}
          className={`
    !w-2 !h-2 !bg-zinc-100 !border-0
    absolute !top-0 !-right-[1px]
    flex items-center justify-center

    origin-top-right
    transition-transform duration-200 hover:scale-[2.5]

    !translate-x-0 !translate-y-0
    group/handle
    ${selected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
        >
          <ArrowRight className="w-[10px] h-[10px] opacity-0 group-hover/handle:opacity-100 transition-opacity duration-200 text-black -rotate-45" />
        </Handle>
      </div>
    </>
  );
};

export default memo(CustomNode);
