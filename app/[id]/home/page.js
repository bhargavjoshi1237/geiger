"use client";

import React, { useState } from 'react';
import BoardCanvas from '@/components/internal/canvas/BoardCanvas';

export default function Home({ params }) {
    const { id } = React.use(params);
    const [activeBoardId, setActiveBoardId] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const onBreadcrumbClick = (boardId) => {
        if (boardId === null) {
            setActiveBoardId(null);
            setBreadcrumbs([]);
        } else {
            const index = breadcrumbs.findIndex(b => b.id === boardId);
            if (index !== -1) {
                setActiveBoardId(boardId);
                setBreadcrumbs(breadcrumbs.slice(0, index + 1));
            }
        }
    };

    const handleNavigate = (boardId, name) => {
        setActiveBoardId(boardId);
        setBreadcrumbs(prev => {
             if (prev.some(b => b.id === boardId)) return prev;
             return [...prev, { id: boardId, name: name || 'Untitled Board' }]
        });
    };

    return (
        <BoardCanvas 
            key={activeBoardId || 'home'} // Forces unmount/remount when board changes
            id={id}
            boardId={activeBoardId}
            onNavigate={handleNavigate}
            breadcrumbs={breadcrumbs}
            onBreadcrumbClick={onBreadcrumbClick}
        />
    );
}
