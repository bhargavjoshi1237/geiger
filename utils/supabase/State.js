"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to fetch and manage canvas state from database
 * @param {string} userId - The user ID
 * @returns {Object} { nodes, edges, viewport, isLoading, error }
 */
export function useCanvasState(userId) {
    const [state, setState] = useState({
        nodes: null,
        edges: null,
        viewport: null,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        async function loadState() {
            try {
                const response = await fetch('/api/load-state', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Failed to load state');
                }

                const data = await response.json();
                
                // Parse JSON strings if they exist
                const parsedNodes = data.nodes ? JSON.parse(data.nodes) : null;
                const parsedEdges = data.edges ? JSON.parse(data.edges) : null;
                const parsedViewport = data.viewport ? JSON.parse(data.viewport) : null;

                setState({
                    nodes: parsedNodes,
                    edges: parsedEdges,
                    viewport: parsedViewport,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error loading canvas state:', error);
                setState({
                    nodes: null,
                    edges: null,
                    viewport: null,
                    isLoading: false,
                    error: error.message
                });
            }
        }

        if (userId) {
            loadState();
        }
    }, [userId]);

    return state;
}

/**
 * Save canvas state to database
 * @param {string} userId - The user ID
 * @param {Array} nodes - The nodes array
 * @param {Array} edges - The edges array
 * @param {Object} viewport - The viewport object
 */
export async function saveCanvasState(userId, nodes, edges, viewport) {
    try {
        await fetch('/api/save-state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                nodes,
                edges,
                viewport
            })
        });
        console.log('State saved to DB');
    } catch (error) {
        console.error('Failed to save state:', error);
        throw error;
    }
}
