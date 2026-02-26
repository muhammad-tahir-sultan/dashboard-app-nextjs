import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { mockFetchData } from '@/utils/mockApi';
import { DataRecord, ChartDataPoint } from '@/types';
import type { RootState } from '@/store/store';

// ── Async thunk ──────────────────────────────────────────────────────
export const fetchDashboardData = createAsyncThunk(
    'data/fetchDashboardData',
    async () => {
        const data = await mockFetchData();
        return data;
    }
);

// ── Slice ────────────────────────────────────────────────────────────
interface DataState {
    records: DataRecord[];
    chartData: ChartDataPoint[];
    loading: boolean;
    error: string | null;
    activeSessions: number;
}

const initialState: DataState = {
    records: [],
    chartData: [],
    loading: false,
    error: null,
    activeSessions: 0,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        incrementActiveSessions(state) {
            state.activeSessions += Math.floor(Math.random() * 20 - 5);
            if (state.activeSessions < 0) state.activeSessions = Math.floor(Math.random() * 100);
        },
        addRealtimeRecord(state, action) {
            state.records.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload.records;
                state.chartData = action.payload.chartData;
                state.activeSessions = Math.floor(Math.random() * 500 + 200);
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export const { incrementActiveSessions, addRealtimeRecord } = dataSlice.actions;
export default dataSlice.reducer;

// ── Memoized Selectors (reselect) ────────────────────────────────────
const selectRecords = (state: RootState): DataRecord[] => state.data?.records || [];
const selectFilters = (state: RootState) => state.ui?.filters || {
    category: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    search: '',
};

export const selectFilteredRecords = createSelector(
    [selectRecords, selectFilters],
    (records: DataRecord[], filters) => {
        let filtered = records;

        if (!filters) return filtered;

        if (filters.category) {
            filtered = filtered.filter((r: DataRecord) => r.category === filters.category);
        }
        if (filters.status) {
            filtered = filtered.filter((r: DataRecord) => r.status === filters.status);
        }
        if (filters.dateFrom) {
            filtered = filtered.filter((r: DataRecord) => r.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
            filtered = filtered.filter((r: DataRecord) => r.date <= filters.dateTo);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            filtered = filtered.filter(
                (r: DataRecord) =>
                    r.name.toLowerCase().includes(q) ||
                    r.email.toLowerCase().includes(q) ||
                    r.id.toLowerCase().includes(q)
            );
        }

        return filtered;
    }
);

export const selectSummaryMetrics = createSelector(
    [selectFilteredRecords, (state: RootState) => state.data?.activeSessions || 0],
    (records: DataRecord[], activeSessions: number) => {
        const totalUsers = records?.length || 0;
        const totalRevenue = records?.reduce((sum: number, r: DataRecord) => sum + r.revenue, 0) || 0;
        const activeUsers = records?.filter((r: DataRecord) => r.status === 'Active').length || 0;
        return { totalUsers, totalRevenue, activeUsers, activeSessions };
    }
);

export const selectChartData = (state: RootState) => state.data?.chartData || [];
export const selectLoading = (state: RootState) => state.data?.loading || false;
export const selectError = (state: RootState) => state.data?.error || null;
