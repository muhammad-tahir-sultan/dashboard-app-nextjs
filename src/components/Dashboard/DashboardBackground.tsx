'use client';

import React, { memo } from 'react';

const DashboardBackground = memo(function DashboardBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
        </div>
    );
});

export default DashboardBackground;
