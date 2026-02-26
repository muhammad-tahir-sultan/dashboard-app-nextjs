import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode: true, // default to dark mode for a premium look
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;
export const selectDarkMode = (state: RootState) => state.theme?.darkMode ?? true;
export default themeSlice.reducer;
