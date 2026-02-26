'use client';

import React, { memo } from 'react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { selectDarkMode } from '@/features/themeSlice';
import { selectFilteredRecords } from '@/features/dataSlice';

const COLORS = ['#818cf8', '#34d399', '#f59e0b', '#f87171'];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-xl">
            <p className="text-sm font-semibold" style={{ color: payload[0].payload.fill }}>
                {payload[0].name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{payload[0].value} users</p>
        </div>
    );
};

const PieChartComponent = memo(function PieChartComponent() {
    const records = useAppSelector(selectFilteredRecords);
    const darkMode = useAppSelector(selectDarkMode);
    const labelColor = darkMode ? '#9ca3af' : '#6b7280';

    const categoryData = React.useMemo(() => {
        const map: Record<string, number> = {};
        records.forEach((r) => {
            map[r.category] = (map[r.category] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [records]);

    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                    >
                        {categoryData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: 12, color: labelColor }}
                        formatter={(value: string) => <span className="text-gray-500 dark:text-gray-400">{value}</span>}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
});

export default PieChartComponent;
