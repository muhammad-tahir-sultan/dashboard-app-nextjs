'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { List } from 'react-window';
const ListAny = List as any;
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectFilteredRecords } from '@/features/dataSlice';
import { setSort, setPage, openModal } from '@/features/uiSlice';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { DataRecord } from '@/utils/mockApi';

const columns: { key: keyof DataRecord | string; label: string; width: string }[] = [
    { key: 'id', label: 'ID', width: 'w-24' },
    { key: 'name', label: 'Name', width: 'w-40' },
    { key: 'email', label: 'Email', width: 'w-48' },
    { key: 'category', label: 'Category', width: 'w-28' },
    { key: 'status', label: 'Status', width: 'w-24' },
    { key: 'revenue', label: 'Revenue', width: 'w-28' },
    { key: 'date', label: 'Date', width: 'w-28' },
    { key: 'country', label: 'Country', width: 'w-32' },
];

const statusColors: Record<string, string> = {
    Active: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    Inactive: 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/30',
    Pending: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
    Churned: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30',
};

const DataTable = memo(function DataTable() {
    const dispatch = useAppDispatch();
    const records = useAppSelector(selectFilteredRecords);
    const { sortField, sortDirection, page, pageSize } = useAppSelector((s) => s.ui);

    // ── Sort ───────────────────────────────────
    const sortedRecords = useMemo(() => {
        const sorted = [...records].sort((a, b) => {
            const aVal = (a as any)[sortField];
            const bVal = (b as any)[sortField];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return sortDirection === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
        return sorted;
    }, [records, sortField, sortDirection]);

    // ── Paginate ───────────────────────────────
    const paginatedRecords = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedRecords.slice(start, start + pageSize);
    }, [sortedRecords, page, pageSize]);

    const totalPages = Math.ceil(sortedRecords.length / pageSize);

    const handleSort = useCallback(
        (field: string) => {
            dispatch(setSort(field));
        },
        [dispatch]
    );

    const handleRowClick = useCallback(
        (id: string) => {
            dispatch(openModal(id));
        },
        [dispatch]
    );

    const getSortIcon = (field: string) => {
        if (sortField !== field) return '↕';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    // ── Virtualized Row ────────────────────────
    const Row = useCallback(
        ({ index, style }: { index: number; style: React.CSSProperties }) => {
            const record = paginatedRecords[index];
            if (!record) return null;

            return (
                <div
                    style={style}
                    onClick={() => handleRowClick(record.id)}
                    className={`
            flex items-center text-sm cursor-pointer border-b border-border/50
            hover:bg-muted/50 transition-colors duration-200
            ${index % 2 === 0 ? 'bg-transparent' : 'bg-muted/20'}
          `}
                >
                    <div className="w-24 px-4 py-3 text-muted-foreground font-mono text-xs">{record.id}</div>
                    <div className="w-40 px-4 py-3 text-foreground font-medium truncate">{record.name}</div>
                    <div className="w-48 px-4 py-3 text-muted-foreground truncate">{record.email}</div>
                    <div className="w-28 px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md text-xs bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-500/20">
                            {record.category}
                        </span>
                    </div>
                    <div className="w-24 px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs border ${statusColors[record.status]}`}>
                            {record.status}
                        </span>
                    </div>
                    <div className="w-28 px-4 py-3 text-foreground font-medium">{formatCurrency(record.revenue)}</div>
                    <div className="w-28 px-4 py-3 text-muted-foreground text-xs">{formatDate(record.date)}</div>
                    <div className="w-32 px-4 py-3 text-muted-foreground truncate">{record.country}</div>
                </div>
            );
        },
        [paginatedRecords, handleRowClick]
    );

    return (
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden transition-all duration-500">
            {/* Header */}
            <div className="flex items-center bg-muted/50 border-b border-border transition-colors duration-500">
                {columns.map((col) => (
                    <button
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className={`${col.width} px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors`}
                    >
                        {col.label} <span className="ml-1 opacity-50">{getSortIcon(col.key)}</span>
                    </button>
                ))}
            </div>

            {/* Virtualized body */}
            {paginatedRecords.length > 0 ? (
                <ListAny
                    rowCount={paginatedRecords.length}
                    rowHeight={48}
                    rowComponent={Row}
                    rowProps={{}}
                    style={{ height: Math.min(paginatedRecords.length * 48, 480), width: '100%' }}
                />
            ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                    No records match the current filters.
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 transition-colors duration-500">
                <p className="text-xs text-gray-500">
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sortedRecords.length)} of{' '}
                    {sortedRecords.length} records
                </p>
                <div className="flex items-center gap-1">
                    <button
                        disabled={page <= 1}
                        onClick={() => dispatch(setPage(page - 1))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background border border-border text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        ‹ Prev
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const p = i + 1;
                        return (
                            <button
                                key={p}
                                onClick={() => dispatch(setPage(p))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${p === page
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-background border border-border text-muted-foreground hover:bg-muted'
                                    }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                    {totalPages > 5 && <span className="text-gray-600 text-xs">...</span>}
                    <button
                        disabled={page >= totalPages}
                        onClick={() => dispatch(setPage(page + 1))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background border border-border text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        Next ›
                    </button>
                </div>
            </div>
        </div>
    );
});

export default DataTable;
