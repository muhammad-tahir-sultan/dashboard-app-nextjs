import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'default' }) => {
    const variants = {
        default: 'bg-muted text-muted-foreground border-border',
        success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
        info: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
