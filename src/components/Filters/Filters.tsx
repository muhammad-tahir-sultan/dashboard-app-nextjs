'use client';

import React, { memo, useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter, resetFilters } from '@/features/uiSlice';
import { useDebounce } from '@/hooks/useDebounce';

const Filters = memo(function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((s) => s.ui.filters);
    const [searchInput, setSearchInput] = useState(filters.search);
    const debouncedSearch = useDebounce(searchInput, 300);

    useEffect(() => {
        dispatch(setFilter({ search: debouncedSearch }));
    }, [debouncedSearch, dispatch]);

    const handleChange = useCallback(
        (field: string, value: string) => {
            dispatch(setFilter({ [field]: value }));
        },
        [dispatch]
    );

    const handleReset = useCallback(() => {
        dispatch(resetFilters());
        setSearchInput('');
    }, [dispatch]);

    const selectClass =
        'bg-gray-800/80 border border-gray-700/50 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-colors appearance-none cursor-pointer';

    const inputClass =
        'bg-gray-800/80 border border-gray-700/50 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-colors w-full';

    return (
        <div className="flex flex-wrap items-end gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Search</label>
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID…"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className={`${inputClass} pl-9`}
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Category</label>
                <select
                    value={filters.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={selectClass}
                >
                    <option value="">All Categories</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="SMB">SMB</option>
                    <option value="Startup">Startup</option>
                    <option value="Individual">Individual</option>
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className={selectClass}
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Churned">Churned</option>
                </select>
            </div>

            {/* Date From */}
            <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">From</label>
                <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleChange('dateFrom', e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Date To */}
            <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">To</label>
                <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleChange('dateTo', e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Reset */}
            <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700/50 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
            >
                Reset
            </button>
        </div>
    );
});

export default Filters;
