import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

interface ThemeState {
    darkMode: boolean;
}

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
    }
    return true; // default
};

const initialState: ThemeState = {
    darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
            }
        },
    },
});


export const { toggleDarkMode } = themeSlice.actions;
export const selectDarkMode = (state: RootState) => state.theme?.darkMode ?? true;
export default themeSlice.reducer;
