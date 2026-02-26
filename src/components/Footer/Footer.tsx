'use client';

import React, { memo } from 'react';

const Footer = memo(function Footer() {
    return (
        <footer className="border-t border-border mt-12 transition-all duration-500 bg-muted/20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <p>© 2026 Analytics Dashboard • Premium Intelligence Suite</p>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        System Operational
                    </span>
                    <p>v1.0.4-stable</p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
