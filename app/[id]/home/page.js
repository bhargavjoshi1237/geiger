"use client";

import React, { useCallback, useMemo } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from '@xyflow/react';
import { useTheme } from "next-themes"
import '@xyflow/react/dist/style.css';
import Sidebar from '@/components/internal/layout/Sidebar';
import Topbar from '@/components/internal/layout/Topbar';
import CustomNode from '@/components/internal/nodes/CustomNode';
import CenterEdge from '@/components/internal/edges/CenterEdge';
import ZoomControls from '@/components/internal/canvas/zoom-controls';
import { useCanvasState, saveCanvasState } from '@/utils/supabase/State';
import { DEFAULT_INITIAL_NODES, DEFAULT_INITIAL_EDGES, DEFAULT_VIEWPORT } from '@/lib/wrapers/homepage/HomePage';

export default function Home({ params }) {
    const { id } = React.use(params);
    const { nodes: dbNodes, edges: dbEdges, viewport: dbViewport, isLoading } = useCanvasState(id);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT);
    const [isInitialized, setIsInitialized] = React.useState(false);

    React.useEffect(() => {
        if (!isLoading && !isInitialized) {
            setNodes(dbNodes || DEFAULT_INITIAL_NODES);
            setEdges(dbEdges || DEFAULT_INITIAL_EDGES);
            setViewport(dbViewport || DEFAULT_VIEWPORT);
            setIsInitialized(true);
        }
    }, [isLoading, dbNodes, dbEdges, dbViewport, isInitialized, setNodes, setEdges]);

    const nodeTypes = useMemo(() => ({
        custom: CustomNode,
    }), []);

    const edgeTypes = useMemo(() => ({
        center: CenterEdge,
    }), []);

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection, type: 'center', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 } }, eds)),
        [setEdges],
    );

    const onNodeDragStop = useCallback((event, node) => {
        setNodes((nodes) =>
            nodes.map((n) => {
                if (n.id === node.id) {
                    return {
                        ...n,
                        position: {
                            x: Math.round(n.position.x / 15) * 15,
                            y: Math.round(n.position.y / 15) * 15,
                        },
                    };
                }
                return n;
            })
        );
    }, [setNodes]);

    const saveTimerRef = React.useRef(null);
    const stateRef = React.useRef({ nodes, edges, viewport });

    React.useEffect(() => {
        stateRef.current.nodes = nodes;
        stateRef.current.edges = edges;
        stateRef.current.viewport = viewport;
    }, [nodes, edges, viewport]);

    const triggerSave = useCallback(() => {
        if (!isInitialized) return; 
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current);
        }

        const debounceTime = process.env.NEXT_PUBLIC_DEBOUNCE_TIME || 5000;
        saveTimerRef.current = setTimeout(async () => {
            const { nodes, edges, viewport } = stateRef.current;
            try {
                await saveCanvasState(id, nodes, edges, viewport);
            } catch (error) {
                console.error('Failed to save state:', error);
            }
        }, parseInt(debounceTime));
    }, [id, isInitialized]);

    React.useEffect(() => {
        triggerSave();
    }, [nodes, edges, triggerSave]);

    const onMove = useCallback((_, newViewport) => {
        stateRef.current.viewport = newViewport;
        setViewport(newViewport);
        triggerSave();
    }, [triggerSave]);

    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (isLoading || !isInitialized) {
        return (
            <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#232323] text-white">
                <Topbar />
                <div className="flex-1 flex h-full relative">
                    <Sidebar />
                    <main className="flex-1 relative h-full bg-[#232323] flex items-center justify-center">
                        <div className="text-gray-400">Loading canvas...</div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#232323] text-white">
            <Topbar />
            <div className="flex-1 flex h-full relative">
                <Sidebar />
                <main className="flex-1 relative h-full bg-[#232323]">
                    <div className="absolute inset-0">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeDragStop={onNodeDragStop}
                            onMove={onMove}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            colorMode="dark"
                            defaultViewport={viewport}
                            className="bg-[#232323]"
                            proOptions={{ hideAttribution: true }}
                            minZoom={0.1}
                            maxZoom={2}
                        >
                            <Background
                                color="#373737"
                                gap={12}
                                size={1}
                                variant="dots"
                            />
                            <ZoomControls />
                        </ReactFlow>
                    </div>
                </main>
            </div>
        </div>
    );
}
