'use client';

import React, { lazy, memo } from 'react';
import ChartCard from './ChartCard';
import { ChartDataPoint } from '@/types';

const BarChart = lazy(() => import('@/components/Charts/BarChart'));
const LineChart = lazy(() => import('@/components/Charts/LineChart'));
const PieChart = lazy(() => import('@/components/Charts/PieChart'));

interface ChartsSectionProps {
    chartData: ChartDataPoint[];
    loading: boolean;
    error: string | null;
}

const ChartsSection = memo(function ChartsSection({ chartData, loading, error }: ChartsSectionProps) {
    if (error) return null;

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard title="Users & Sessions Overview" loading={loading}>
                    <BarChart data={chartData} />
                </ChartCard>
                <ChartCard title="Revenue Trend" loading={loading}>
                    <LineChart data={chartData} />
                </ChartCard>
            </div>

            <ChartCard title="User Distribution by Category" loading={loading}>
                <PieChart />
            </ChartCard>
        </>
    );
});

export default ChartsSection;
