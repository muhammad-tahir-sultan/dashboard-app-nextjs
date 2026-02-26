'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

function Skeleton({ className = '', style }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] rounded-xl ${className}`}
            style={style}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-gray-50 dark:bg-gray-900/40 p-6 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-gray-50 dark:bg-gray-900/40 p-6">
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="flex items-end gap-2 h-[300px]">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="flex-1"
                        style={{ height: `${Math.random() * 60 + 30}%` } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-white dark:bg-gray-900/40 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800/40">
                <Skeleton className="h-4 w-full" />
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800/20">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            ))}
        </div>
    );
}

export default Skeleton;
