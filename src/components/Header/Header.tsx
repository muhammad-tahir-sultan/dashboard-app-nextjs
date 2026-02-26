'use client';

import React, { memo } from 'react';
import DarkModeToggle from '@/components/Layout/DarkModeToggle';

const Header = memo(function Header() {
    return (
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border transition-all duration-500">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold opacity-80 decoration-indigo-500/30">
                        Real-time business intelligence
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">Live</span>
                    </div>
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
});

export default Header;
