'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { incrementActiveSessions } from '@/features/dataSlice';

export function useRealtimeUpdates(intervalMs: number = 5000) {
    const dispatch = useAppDispatch();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            dispatch(incrementActiveSessions());
        }, intervalMs);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [dispatch, intervalMs]);
}
