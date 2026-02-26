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
import type { ChartDataPoint } from '@/utils/mockApi';

interface LineChartProps {
    data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-xl">
            <p className="text-sm font-semibold text-gray-200 mb-2">{label}</p>
            {payload.map((item: any, idx: number) => (
                <p key={idx} className="text-xs" style={{ color: item.color }}>
                    {item.name}: ${item.value.toLocaleString()}
                </p>
            ))}
        </div>
    );
};

const LineChartComponent = memo(function LineChartComponent({ data }: LineChartProps) {
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
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
                        dot={{ r: 4, fill: '#f59e0b', stroke: '#1f2937', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#fbbf24', stroke: '#f59e0b', strokeWidth: 2 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default LineChartComponent;
