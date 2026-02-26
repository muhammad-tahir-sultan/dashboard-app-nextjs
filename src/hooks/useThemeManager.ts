'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectDarkMode } from '@/features/themeSlice';

export function useThemeManager() {
    const darkMode = useAppSelector(selectDarkMode);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    return { darkMode };
}
