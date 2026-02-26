'use client';

import React, { useEffect, Suspense, lazy, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchDashboardData,
    selectSummaryMetrics,
    selectChartData,
    selectLoading,
    selectError,
} from '@/features/dataSlice';
import { selectDarkMode } from '@/features/themeSlice';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import Card from '@/components/Card/Card';
import Filters from '@/components/Filters/Filters';
import DarkModeToggle from '@/components/Layout/DarkModeToggle';
import DetailModal from '@/components/Modal/DetailModal';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import { CardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/Skeleton/Skeleton';
import { formatCurrency, formatNumber } from '@/utils/formatters';

// ── Lazy-loaded heavy components ─────────────────────────────────────
const BarChart = lazy(() => import('@/components/Charts/BarChart'));
const LineChart = lazy(() => import('@/components/Charts/LineChart'));
const PieChart = lazy(() => import('@/components/Charts/PieChart'));
const DataTable = lazy(() => import('@/components/Table/DataTable'));

// ── Icons (inline SVGs) ─────────────────────────────────────────────
const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

const ActivityIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const RevenueIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ActiveIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const metrics = useAppSelector(selectSummaryMetrics);
    const chartData = useAppSelector(selectChartData);
    const darkMode = useAppSelector(selectDarkMode);

    // Bootstrap data
    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    // Real-time session updates every 5 s
    useRealtimeUpdates(5000);

    const handleRetry = useCallback(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-950 text-gray-100 transition-colors duration-300">
                {/* Background gradient decoration */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <header className="sticky top-0 z-30 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Analytics Dashboard
                            </h1>
                            <p className="text-xs text-gray-500 mt-0.5">Real-time business intelligence</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-xs text-emerald-400 font-medium">Live</span>
                            </div>
                            <DarkModeToggle />
                        </div>
                    </div>
                </header>

                <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    {/* ── Summary Cards ──────────────────────────── */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
                        </div>
                    ) : error ? (
                        <ErrorFallback message={error} onRetry={handleRetry} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card
                                title="Total Users"
                                value={formatNumber(metrics.totalUsers)}
                                subtitle="From filtered results"
                                icon={<UsersIcon />}
                                color="blue"
                                trend={{ value: 12.5, isUp: true }}
                            />
                            <Card
                                title="Active Sessions"
                                value={formatNumber(metrics.activeSessions)}
                                subtitle="Updates every 5s"
                                icon={<ActivityIcon />}
                                color="emerald"
                                trend={{ value: 8.3, isUp: true }}
                            />
                            <Card
                                title="Total Revenue"
                                value={formatCurrency(metrics.totalRevenue)}
                                subtitle="Across all categories"
                                icon={<RevenueIcon />}
                                color="violet"
                                trend={{ value: 23.1, isUp: true }}
                            />
                            <Card
                                title="Active Users"
                                value={formatNumber(metrics.activeUsers)}
                                subtitle="Currently active status"
                                icon={<ActiveIcon />}
                                color="amber"
                                trend={{ value: 4.2, isUp: false }}
                            />
                        </div>
                    )}

                    {/* ── Filters ────────────────────────────────── */}
                    <div className="rounded-2xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl p-4">
                        <Filters />
                    </div>

                    {/* ── Charts ─────────────────────────────────── */}
                    {error ? (
                        <ErrorFallback message="Charts unavailable" onRetry={handleRetry} />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Suspense fallback={<ChartSkeleton />}>
                                <div className="rounded-2xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl p-6">
                                    <h2 className="text-sm font-semibold text-gray-400 mb-4">Users & Sessions Overview</h2>
                                    {loading ? <ChartSkeleton /> : <BarChart data={chartData} />}
                                </div>
                            </Suspense>
                            <Suspense fallback={<ChartSkeleton />}>
                                <div className="rounded-2xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl p-6">
                                    <h2 className="text-sm font-semibold text-gray-400 mb-4">Revenue Trend</h2>
                                    {loading ? <ChartSkeleton /> : <LineChart data={chartData} />}
                                </div>
                            </Suspense>
                        </div>
                    )}

                    {/* ── Pie Chart (full width) ─────────────────── */}
                    {!error && (
                        <Suspense fallback={<ChartSkeleton />}>
                            <div className="rounded-2xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl p-6">
                                <h2 className="text-sm font-semibold text-gray-400 mb-4">User Distribution by Category</h2>
                                {loading ? <ChartSkeleton /> : <PieChart />}
                            </div>
                        </Suspense>
                    )}

                    {/* ── Data Table ─────────────────────────────── */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-400 mb-3">Records</h2>
                        <Suspense fallback={<TableSkeleton />}>
                            {loading ? <TableSkeleton /> : error ? (
                                <ErrorFallback message="Table unavailable" onRetry={handleRetry} />
                            ) : (
                                <div className="overflow-x-auto">
                                    <div className="min-w-[800px]">
                                        <DataTable />
                                    </div>
                                </div>
                            )}
                        </Suspense>
                    </div>
                </main>

                {/* ── Detail Modal ─────────────────────────────── */}
                <DetailModal />

                {/* Footer */}
                <footer className="border-t border-gray-800/40 mt-8">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600">
                        <p>© 2026 Analytics Dashboard. Built with Next.js, Redux Toolkit & Recharts.</p>
                        <p className="mt-1 sm:mt-0">Real-time data simulation active</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
