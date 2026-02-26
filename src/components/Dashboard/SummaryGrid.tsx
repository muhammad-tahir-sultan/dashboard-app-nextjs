import React, { memo } from 'react';
import Card from '@/components/Card/Card';
import { CardSkeleton } from '@/components/Skeleton/Skeleton';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { UsersIcon, ActivityIcon, RevenueIcon, ActiveIcon } from '@/components/icons';
import { SummaryMetrics } from '@/types';

interface SummaryGridProps {
    metrics: SummaryMetrics;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
}

const SummaryGrid = memo(function SummaryGrid({ metrics, loading, error, onRetry }: SummaryGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
        );
    }

    if (error) {
        return <ErrorFallback message={error} onRetry={onRetry} />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
                title="Total Users"
                value={formatNumber(metrics.totalUsers)}
                subtitle="From filtered results"
                icon={<UsersIcon />}
                color="blue"
                trend={{ value: 12.5, isUp: true }}
            />
            <Card
                title="Active Sessions"
                value={formatNumber(metrics.activeSessions)}
                subtitle="Updates every 5s"
                icon={<ActivityIcon />}
                color="emerald"
                trend={{ value: 8.3, isUp: true }}
            />
            <Card
                title="Total Revenue"
                value={formatCurrency(metrics.totalRevenue)}
                subtitle="Across all categories"
                icon={<RevenueIcon />}
                color="violet"
                trend={{ value: 23.1, isUp: true }}
            />
            <Card
                title="Active Users"
                value={formatNumber(metrics.activeUsers)}
                subtitle="Currently active status"
                icon={<ActiveIcon />}
                color="amber"
                trend={{ value: 4.2, isUp: false }}
            />
        </div>
    );
});

export default SummaryGrid;
