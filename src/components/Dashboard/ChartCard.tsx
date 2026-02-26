'use client';

import React, { memo } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Suspense } from 'react';
import { ChartSkeleton } from '@/components/Skeleton/Skeleton';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    loading?: boolean;
}

const ChartCard = memo(function ChartCard({ title, children, loading }: ChartCardProps) {
    return (
        <ErrorBoundary>
            <Suspense fallback={<ChartSkeleton />}>
                <div className="rounded-2xl border border-border bg-card shadow-premium p-6 transition-all duration-500 hover:shadow-premium-hover">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">{title}</h2>
                    {loading ? <ChartSkeleton /> : children}
                </div>
            </Suspense>
        </ErrorBoundary>
    );
});

export default ChartCard;
