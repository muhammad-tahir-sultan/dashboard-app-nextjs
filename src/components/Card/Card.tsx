'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: { value: number; isUp: boolean };
    color: 'blue' | 'emerald' | 'violet' | 'amber';
}

const colorMap = {
    blue: {
        bg: 'from-blue-500/20 to-blue-600/5',
        border: 'border-blue-500/30',
        icon: 'text-blue-400',
        glow: 'shadow-blue-500/10',
    },
    emerald: {
        bg: 'from-emerald-500/20 to-emerald-600/5',
        border: 'border-emerald-500/30',
        icon: 'text-emerald-400',
        glow: 'shadow-emerald-500/10',
    },
    violet: {
        bg: 'from-violet-500/20 to-violet-600/5',
        border: 'border-violet-500/30',
        icon: 'text-violet-400',
        glow: 'shadow-violet-500/10',
    },
    amber: {
        bg: 'from-amber-500/20 to-amber-600/5',
        border: 'border-amber-500/30',
        icon: 'text-amber-400',
        glow: 'shadow-amber-500/10',
    },
};

const Card = memo(function Card({ title, value, subtitle, icon, trend, color }: CardProps) {
    const c = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`
        relative overflow-hidden rounded-2xl border ${c.border}
        bg-gradient-to-br ${c.bg}
        backdrop-blur-xl p-6
        shadow-lg ${c.glow}
        hover:scale-[1.02] transition-transform duration-300
        dark:bg-gray-900/50
      `}
        >
            {/* Decorative glow circle */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${c.bg} opacity-40 blur-2xl`} />

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-400 mb-1">{title}</p>
                    <motion.p
                        key={String(value)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-3xl font-bold text-gray-100 tracking-tight"
                    >
                        {value}
                    </motion.p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-white/5 ${c.icon}`}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-1 relative z-10">
                    <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.isUp
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                            }`}
                    >
                        {trend.isUp ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </span>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
            )}
        </motion.div>
    );
});

export default Card;
