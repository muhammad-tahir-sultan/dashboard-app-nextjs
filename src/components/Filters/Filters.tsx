'use client';

import React, { memo, useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter, resetFilters } from '@/features/uiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { CATEGORIES, STATUSES } from '@/constants';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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

    const categoryOptions = [
        { label: 'All Categories', value: '' },
        ...CATEGORIES.map(c => ({ label: c, value: c }))
    ];

    const statusOptions = [
        { label: 'All Statuses', value: '' },
        ...STATUSES.map(s => ({ label: s, value: s }))
    ];

    return (
        <div className="flex flex-wrap items-end gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
                <Input
                    label="Search"
                    placeholder="Search by name, email, or ID…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    icon={
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Category */}
            <div className="w-full sm:w-auto min-w-[160px]">
                <Select
                    label="Category"
                    value={filters.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    options={categoryOptions}
                />
            </div>

            {/* Status */}
            <div className="w-full sm:w-auto min-w-[160px]">
                <Select
                    label="Status"
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    options={statusOptions}
                />
            </div>

            {/* Date From */}
            <div className="w-full sm:w-auto min-w-[150px]">
                <Input
                    label="From"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleChange('dateFrom', e.target.value)}
                />
            </div>

            {/* Date To */}
            <div className="w-full sm:w-auto min-w-[150px]">
                <Input
                    label="To"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleChange('dateTo', e.target.value)}
                />
            </div>

            {/* Reset */}
            <Button
                variant="secondary"
                onClick={handleReset}
                className="h-[38px] px-6" // Match input height roughly
            >
                Reset
            </Button>
        </div>
    );
});

export default Filters;
