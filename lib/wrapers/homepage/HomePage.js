import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge, MarkerType } from '@xyflow/react';
import { useCanvasState, saveCanvasState } from '@/utils/supabase/State';
import { copyToClipboard, pasteFromClipboard } from '@/lib/accessibility/clipboard';

// Default initial nodes for new users
export const DEFAULT_INITIAL_NODES = [
    { 
        id: '2', 
        position: { x: 100, y: 150 }, 
        data: { label: '' }, 
        type: 'custom', 
        style: { width: 336, height: 68 } 
    },
    { 
        id: '3', 
        position: { x: 400, y: 150 }, 
        data: { label: '' }, 
        type: 'custom', 
        style: { width: 336, height: 68 } 
    },
];

// Default initial edges for new users
export const DEFAULT_INITIAL_EDGES = [
    { 
        id: 'e1-2', 
        source: '1', 
        target: '2', 
        animated: true, 
        type: 'center', 
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 } 
    },
    { 
        id: 'e1-3', 
        source: '1', 
        target: '3', 
        type: 'center', 
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 } 
    },
];

// Default viewport for new users
export const DEFAULT_VIEWPORT = { 
    zoom: 0.9, 
    x: 0, 
    y: 0 
};

export const useHomeLogic = (id) => {
    const { nodes: dbNodes, edges: dbEdges, viewport: dbViewport, isLoading } = useCanvasState(id);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isLoading && !isInitialized) {
            setNodes(dbNodes || DEFAULT_INITIAL_NODES);
            setEdges(dbEdges || DEFAULT_INITIAL_EDGES);
            setViewport(dbViewport || DEFAULT_VIEWPORT);
            setIsInitialized(true);
        }
    }, [isLoading, dbNodes, dbEdges, dbViewport, isInitialized, setNodes, setEdges]);

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

    const saveTimerRef = useRef(null);
    const stateRef = useRef({ nodes, edges, viewport });

    useEffect(() => {
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

    useEffect(() => {
        triggerSave();
    }, [nodes, edges, triggerSave]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const activeElement = document.activeElement;
            const isInput = ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) || activeElement.isContentEditable;

            if (isInput) return;

            if (event.key === 'Delete' || event.key === 'Backspace') {
                setNodes((nds) => nds.filter((n) => !n.selected));
                setEdges((eds) => eds.filter((e) => !e.selected));
            } else if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
                copyToClipboard(nodes, edges);
            } else if ((event.metaKey || event.ctrlKey) && event.key === 'v') {
                pasteFromClipboard(nodes, setNodes, setEdges);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nodes, edges, setNodes, setEdges]); // Added nodes dependency so copy has fresh state

    const onMove = useCallback((_, newViewport) => {
        stateRef.current.viewport = newViewport;
        setViewport(newViewport);
        triggerSave();
    }, [triggerSave]);

    return {
        nodes,
        edges,
        viewport,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onNodeDragStop,
        onMove,
        isInitialized,
        isLoading,
        // Canvas controls
        panOnDrag: [1], // Middle mouse button
        selectionOnDrag: true,
        panOnScroll: true,
        zoomOnScroll: true,
        zoomOnScroll: true,
        setEdges, // Expose setEdges for external updates
        setNodes, // Expose setNodes for external updates
    };
};
