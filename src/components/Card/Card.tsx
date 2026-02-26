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
        bg: 'from-blue-500/30 to-blue-600/5 dark:from-blue-500/40 dark:to-transparent',
        border: 'border-blue-500/30 dark:border-blue-500/50',
        icon: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-500/15 dark:bg-blue-500/30',
        glow: 'shadow-[0_0_25px_rgba(59,130,246,0.12)] dark:shadow-[0_0_40px_rgba(59,130,246,0.2)]',
    },
    emerald: {
        bg: 'from-emerald-500/30 to-emerald-600/5 dark:from-emerald-500/40 dark:to-transparent',
        border: 'border-emerald-500/30 dark:border-emerald-500/50',
        icon: 'text-emerald-600 dark:text-emerald-400',
        iconBg: 'bg-emerald-500/15 dark:bg-emerald-500/30',
        glow: 'shadow-[0_0_25px_rgba(16,185,129,0.12)] dark:shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    },
    violet: {
        bg: 'from-violet-500/30 to-violet-600/5 dark:from-violet-500/40 dark:to-transparent',
        border: 'border-violet-500/30 dark:border-violet-500/50',
        icon: 'text-violet-600 dark:text-violet-400',
        iconBg: 'bg-violet-500/15 dark:bg-violet-500/30',
        glow: 'shadow-[0_0_25px_rgba(139,92,246,0.12)] dark:shadow-[0_0_40px_rgba(139,92,246,0.2)]',
    },
    amber: {
        bg: 'from-amber-500/30 to-amber-600/5 dark:from-amber-500/40 dark:to-transparent',
        border: 'border-amber-500/30 dark:border-amber-500/50',
        icon: 'text-amber-600 dark:text-amber-400',
        iconBg: 'bg-amber-500/15 dark:bg-amber-500/30',
        glow: 'shadow-[0_0_25px_rgba(245,158,11,0.12)] dark:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
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
        relative overflow-hidden rounded-2xl border p-6 
        bg-card/60 dark:bg-card/40 backdrop-blur-xl
        ${c.border} ${c.glow}
        hover:scale-[1.01] transition-all duration-500 cursor-default
      `}
        >
            {/* Background decorative gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-[0.1] dark:opacity-[0.2] pointer-events-none ${c.bg}`} />
            <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-30 dark:opacity-40 ${c.bg}`} />

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-400 mb-1">{title}</p>
                    <motion.p
                        key={String(value)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-3xl font-bold text-foreground tracking-tight"
                    >
                        {value}
                    </motion.p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${c.iconBg} ${c.icon}`}>
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
