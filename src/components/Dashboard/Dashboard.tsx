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
import SummaryGrid from './SummaryGrid';
import Filters from '@/components/Filters/Filters';
import DetailModal from '@/components/Modal/DetailModal';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ChartSkeleton, TableSkeleton } from '@/components/Skeleton/Skeleton';

// ── Lazy-loaded heavy components ─────────────────────────────────────
const BarChart = lazy(() => import('@/components/Charts/BarChart'));
const LineChart = lazy(() => import('@/components/Charts/LineChart'));
const PieChart = lazy(() => import('@/components/Charts/PieChart'));
const DataTable = lazy(() => import('@/components/Table/DataTable'));
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

export default function Dashboard() {
    const darkMode = useAppSelector(selectDarkMode);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const metrics = useAppSelector(selectSummaryMetrics);
    const chartData = useAppSelector(selectChartData);

    // Apply dark mode class to html element
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [darkMode]);

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
        <div className="min-h-screen bg-background text-foreground transition-all duration-500 ease-in-out font-sans">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
            </div>

            {/* Header */}
            <Header />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* ── Metrics ────────────────────────────────── */}
                <ErrorBoundary>
                    <SummaryGrid
                        metrics={metrics}
                        loading={loading}
                        error={error}
                        onRetry={handleRetry}
                    />
                </ErrorBoundary>

                {/* ── Filters ────────────────────────────────── */}
                <div className="rounded-2xl border border-border bg-card shadow-premium p-4 transition-all duration-500 hover:shadow-premium-hover">
                    <Filters />
                </div>

                {/* ── Charts Grid ────────────────────────────── */}
                {!error && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ErrorBoundary>
                            <Suspense fallback={<ChartSkeleton />}>
                                <div className="rounded-2xl border border-border bg-card shadow-premium p-6 transition-all duration-500 hover:shadow-premium-hover">
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Users & Sessions Overview</h2>
                                    {loading ? <ChartSkeleton /> : <BarChart data={chartData} />}
                                </div>
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<ChartSkeleton />}>
                                <div className="rounded-2xl border border-border bg-card shadow-premium p-6 transition-all duration-500 hover:shadow-premium-hover">
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Revenue Trend</h2>
                                    {loading ? <ChartSkeleton /> : <LineChart data={chartData} />}
                                </div>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                )}

                {/* ── Pie Chart ──────────────────────────────── */}
                {!error && (
                    <ErrorBoundary>
                        <Suspense fallback={<ChartSkeleton />}>
                            <div className="rounded-2xl border border-border bg-card shadow-premium p-6 transition-all duration-500 hover:shadow-premium-hover">
                                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">User Distribution by Category</h2>
                                {loading ? <ChartSkeleton /> : <PieChart />}
                            </div>
                        </Suspense>
                    </ErrorBoundary>
                )}

                {/* ── Data Table ─────────────────────────────── */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Detailed Records</h2>
                    <ErrorBoundary>
                        <Suspense fallback={<TableSkeleton />}>
                            {loading ? <TableSkeleton /> : error ? (
                                <ErrorFallback message="Table unavailable" onRetry={handleRetry} />
                            ) : (
                                <div className="overflow-x-auto pb-4">
                                    <div className="min-w-[800px]">
                                        <DataTable />
                                    </div>
                                </div>
                            )}
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </main>

            {/* ── Detail Modal ─────────────────────────────── */}
            <DetailModal />

            {/* Footer */}
            <Footer />
        </div>
    );
}


