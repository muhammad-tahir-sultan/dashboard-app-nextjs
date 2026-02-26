import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import DataTable from '@/components/Table/DataTable';

// Mock react-window as it can be tricky in JSDOM
jest.mock('react-window', () => ({
    List: ({ rowComponent: RowComponent, rowCount, rowHeight, style }: any) => (
        <div style={{ ...style, overflow: 'auto' }}>
            {Array.from({ length: rowCount }).map((_, index) => (
                <div key={index} style={{ height: rowHeight }}>
                    <RowComponent index={index} style={{}} />
                </div>
            ))}
        </div>
    ),
}));

describe('DataTable Component', () => {
    const mockRecords = [
        {
            id: 'REC-0001',
            name: 'John Doe',
            email: 'john@example.com',
            category: 'Enterprise' as const,
            status: 'Active' as const,
            revenue: 5000,
            sessions: 100,
            date: '2025-01-01',
            country: 'USA',
            plan: 'Pro' as const,
        },
        {
            id: 'REC-0002',
            name: 'Jane Smith',
            email: 'jane@example.com',
            category: 'SMB' as const,
            status: 'Inactive' as const,
            revenue: 2000,
            sessions: 50,
            date: '2025-01-02',
            country: 'Canada',
            plan: 'Basic' as const,
        },
    ];

    it('renders table headers', () => {
        renderWithProviders(<DataTable />, {
            preloadedState: {
                data: {
                    records: mockRecords,
                    chartData: [],
                    loading: false,
                    error: null,
                    activeSessions: 0,
                },
                ui: {
                    filters: { category: '', status: '', dateFrom: '', dateTo: '', search: '' },
                    page: 1,
                    pageSize: 20,
                    sortField: 'date',
                    sortDirection: 'desc',
                    modalRecordId: null,
                },
            } as any,
        });

        expect(screen.getByText(/CUSTOMER/i)).toBeInTheDocument();
        expect(screen.getByText(/EMAIL/i)).toBeInTheDocument();
        expect(screen.getByText(/STATUS/i)).toBeInTheDocument();
    });

    it('renders records from state', () => {
        renderWithProviders(<DataTable />, {
            preloadedState: {
                data: {
                    records: mockRecords,
                    chartData: [],
                    loading: false,
                    error: null,
                    activeSessions: 0,
                },
                ui: {
                    filters: { category: '', status: '', dateFrom: '', dateTo: '', search: '' },
                    page: 1,
                    pageSize: 20,
                    sortField: 'name',
                    sortDirection: 'asc',
                    modalRecordId: null,
                },
            } as any,
        });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
});
