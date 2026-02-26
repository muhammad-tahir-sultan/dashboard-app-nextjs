'use client';

import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchDashboardData,
    selectSummaryMetrics,
    selectChartData,
    selectLoading,
    selectError,
} from '@/features/dataSlice';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { useThemeManager } from '@/hooks/useThemeManager';

// ── Components ──────────────────────────────────────────────────────
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DetailModal from '@/components/Modal/DetailModal';
import Filters from '@/components/Filters/Filters';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

// ── Dashboard Sections ──────────────────────────────────────────────
import SummaryGrid from './SummaryGrid';
import ChartsSection from './ChartsSection';
import RecordsSection from './RecordsSection';
import DashboardBackground from './DashboardBackground';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const metrics = useAppSelector(selectSummaryMetrics);
    const chartData = useAppSelector(selectChartData);

    // Initial theme & data sync
    useThemeManager();
    useEffect(() => { dispatch(fetchDashboardData()); }, [dispatch]);

    // Real-time session updates
    useRealtimeUpdates(5000);

    const handleRetry = useCallback(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-background text-foreground transition-all duration-500 ease-in-out font-sans">
            <DashboardBackground />
            <Header />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* ── Metrics Summary ── */}
                <ErrorBoundary>
                    <SummaryGrid
                        metrics={metrics}
                        loading={loading}
                        error={error}
                        onRetry={handleRetry}
                    />
                </ErrorBoundary>

                {/* ── Global Search & Filters ── */}
                <div className="rounded-2xl border border-border bg-card shadow-premium p-4 transition-all duration-500 hover:shadow-premium-hover">
                    <Filters />
                </div>

                {/* ── Data Visualizations ── */}
                <ChartsSection
                    chartData={chartData}
                    loading={loading}
                    error={error}
                />

                {/* ── Table of Records ── */}
                <RecordsSection
                    loading={loading}
                    error={error}
                    onRetry={handleRetry}
                />
            </main>

            <DetailModal />
            <Footer />
        </div>
    );
}
