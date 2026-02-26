'use client';

import React, { memo } from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { selectDarkMode } from '@/features/themeSlice';
import { ChartDataPoint } from '@/types';

interface LineChartProps {
    data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-xl">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">{label}</p>
            {payload.map((item: any, idx: number) => (
                <p key={idx} className="text-xs" style={{ color: item.color }}>
                    {item.name}: ${item.value.toLocaleString()}
                </p>
            ))}
        </div>
    );
};

const LineChartComponent = memo(function LineChartComponent({ data }: LineChartProps) {
    const darkMode = useAppSelector(selectDarkMode);
    const labelColor = darkMode ? '#9ca3af' : '#6b7280';
    const gridColor = darkMode ? '#374151' : '#e5e7eb';

    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={darkMode ? 0.3 : 0.6} />
                    <XAxis dataKey="month" stroke={labelColor} fontSize={12} tickLine={false} />
                    <YAxis stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: labelColor }} />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="transparent"
                        fill="url(#lineGradient)"
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#f59e0b', stroke: darkMode ? '#1f2937' : '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#fbbf24', stroke: '#f59e0b', strokeWidth: 2 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default LineChartComponent;
