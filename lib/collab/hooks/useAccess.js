import { useCallback } from 'react';
import { toast } from "sonner";
import { getRandomColor } from '../utils';

export const useAccess = (supabase, sessionId, user, sessionData, role, setSessionData, setRole) => {
    const requestAccess = useCallback(async () => {
        if (!user || !sessionData) return;
        const currentJoiners = sessionData.joiners || {};
        if (currentJoiners[user.id]) return;
        const newJoiners = {
            ...currentJoiners,
            [user.id]: {
                id: user.id,
                status: 'requested',
                email: user.email,
                name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown',
                requestedAt: new Date().toISOString()
            }
        };

        const { error } = await supabase
            .from('collab')
            .update({ joiners: newJoiners })
            .eq('id', sessionId);
        
        if (!error) {
             setSessionData(prev => ({ ...prev, joiners: newJoiners }));
             setRole('pending');
             toast.success("Request sent to host");
        } else {
             toast.error("Failed to send request");
        }
    }, [supabase, sessionId, user, sessionData, setSessionData, setRole]);

    const acceptRequest = useCallback(async (userId) => {
        if (role !== 'host') return;
        const currentJoiners = sessionData.joiners || {};
        if (!currentJoiners[userId]) return;
        const newJoiners = {
            ...currentJoiners,
            [userId]: {
                ...currentJoiners[userId],
                status: 'joined',
                joinedAt: new Date().toISOString(),
                color: getRandomColor()
            }
        };
        
        const { error } = await supabase.from('collab').update({ joiners: newJoiners }).eq('id', sessionId);
        if (!error) {
            setSessionData(prev => ({ ...prev, joiners: newJoiners }));
            toast.success("Member accepted");
        } else {
            toast.error("Failed to accept member");
        }
    }, [supabase, sessionId, sessionData, role, setSessionData]);

    const kickMember = useCallback(async (userId) => {
        if (role !== 'host') return;
        const currentJoiners = sessionData.joiners || {};
        if (!currentJoiners[userId]) return;
        const { [userId]: removed, ...remainingJoiners } = currentJoiners;
        const { error } = await supabase.from('collab').update({ joiners: remainingJoiners }).eq('id', sessionId);
        if (!error) {
            setSessionData(prev => ({ ...prev, joiners: remainingJoiners }));
            toast.success("Member removed");
        } else {
            toast.error("Failed to remove member");
        }
    }, [supabase, sessionId, sessionData, role, setSessionData]);

    const leaveSession = useCallback(async () => {
        if (!user || !sessionData) return;
        const currentJoiners = sessionData.joiners || {};
        if (!currentJoiners[user.id]) return;
        const { [user.id]: removed, ...remainingJoiners } = currentJoiners;
        const { error } = await supabase.from('collab').update({ joiners: remainingJoiners }).eq('id', sessionId);
        if (!error) {
            setSessionData(prev => ({ ...prev, joiners: remainingJoiners }));
            setRole('viewer');
            toast.info("You have left the session");
        } else {
            toast.error("Failed to leave session");
        }
    }, [supabase, sessionId, user, sessionData, setSessionData, setRole]);

    return { requestAccess, acceptRequest, kickMember, leaveSession };
};
