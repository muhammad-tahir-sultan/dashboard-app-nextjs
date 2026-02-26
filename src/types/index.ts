export interface DataRecord {
    id: string;
    name: string;
    email: string;
    category: 'Enterprise' | 'SMB' | 'Startup' | 'Individual';
    status: 'Active' | 'Inactive' | 'Pending' | 'Churned';
    revenue: number;
    sessions: number;
    date: string; // ISO date string
    country: string;
    plan: 'Free' | 'Basic' | 'Pro' | 'Enterprise';
}

export interface ChartDataPoint {
    month: string;
    users: number;
    revenue: number;
    sessions: number;
}

export interface FiltersState {
    category: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    search: string;
}

export interface SummaryMetrics {
    totalUsers: number;
    activeSessions: number;
    totalRevenue: number;
    activeUsers: number;
}
