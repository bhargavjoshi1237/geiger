import { MarkerType } from '@xyflow/react';

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
