import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '@/types';

interface UiState {
    filters: FiltersState;
    page: number;
    pageSize: number;
    sortField: string;
    sortDirection: 'asc' | 'desc';
    modalRecordId: string | null;
}

const initialState: UiState = {
    filters: {
        category: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        search: '',
    },
    page: 1,
    pageSize: 20,
    sortField: 'date',
    sortDirection: 'desc',
    modalRecordId: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<Partial<FiltersState>>) {
            state.filters = { ...state.filters, ...action.payload };
            state.page = 1; // reset page when filter changes
        },
        resetFilters(state) {
            state.filters = initialState.filters;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
            state.page = 1;
        },
        setSort(state, action: PayloadAction<string>) {
            if (state.sortField === action.payload) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortField = action.payload;
                state.sortDirection = 'asc';
            }
        },
        openModal(state, action: PayloadAction<string>) {
            state.modalRecordId = action.payload;
        },
        closeModal(state) {
            state.modalRecordId = null;
        },
    },
});

export const {
    setFilter,
    resetFilters,
    setPage,
    setPageSize,
    setSort,
    openModal,
    closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
