'use client';

import React, { lazy, Suspense, memo } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import { TableSkeleton } from '@/components/Skeleton/Skeleton';

const DataTable = lazy(() => import('@/components/Table/DataTable'));

interface RecordsSectionProps {
    loading: boolean;
    error: string | null;
    onRetry: () => void;
}

const RecordsSection = memo(function RecordsSection({ loading, error, onRetry }: RecordsSectionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Detailed Records</h2>
            <ErrorBoundary>
                <Suspense fallback={<TableSkeleton />}>
                    {loading ? (
                        <TableSkeleton />
                    ) : error ? (
                        <ErrorFallback message="Table unavailable" onRetry={onRetry} />
                    ) : (
                        <div className="overflow-x-auto pb-4">
                            <div className="min-w-[800px]">
                                <DataTable />
                            </div>
                        </div>
                    )}
                </Suspense>
            </ErrorBoundary>
        </div>
    );
});

export default RecordsSection;
