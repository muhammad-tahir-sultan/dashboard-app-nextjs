'use client';

import React, { memo } from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { selectDarkMode } from '@/features/themeSlice';
import { ChartDataPoint } from '@/types';

interface BarChartProps {
    data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-xl">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">{label}</p>
            {payload.map((item: any, idx: number) => (
                <p key={idx} className="text-xs" style={{ color: item.color }}>
                    {item.name}: {item.name === 'Revenue' ? `$${item.value.toLocaleString()}` : item.value.toLocaleString()}
                </p>
            ))}
        </div>
    );
};

const BarChartComponent = memo(function BarChartComponent({ data }: BarChartProps) {
    const darkMode = useAppSelector(selectDarkMode);
    const labelColor = darkMode ? '#9ca3af' : '#6b7280';
    const gridColor = darkMode ? '#374151' : '#e5e7eb';

    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="barGradientUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="barGradientSessions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={darkMode ? 0.3 : 0.6} />
                    <XAxis dataKey="month" stroke={labelColor} fontSize={12} tickLine={false} />
                    <YAxis stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: 12, color: labelColor }}
                    />
                    <Bar
                        dataKey="users"
                        name="Users"
                        fill="url(#barGradientUsers)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                    />
                    <Bar
                        dataKey="sessions"
                        name="Sessions"
                        fill="url(#barGradientSessions)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                    />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default BarChartComponent;
