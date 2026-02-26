import { DataRecord, ChartDataPoint } from '@/types';
import { CATEGORIES, STATUSES, PLANS, MONTHS } from '@/constants';

const firstNames = [
    'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Sophia', 'Mason',
    'Isabella', 'Lucas', 'Mia', 'Ethan', 'Amelia', 'Aiden', 'Harper',
    'Elijah', 'Evelyn', 'Logan', 'Abigail', 'Alexander', 'Emily', 'Sebastian',
    'Elizabeth', 'Jack', 'Sofia', 'Daniel', 'Victoria', 'Henry', 'Scarlett',
    'Michael', 'Aria', 'Owen', 'Grace', 'Samuel', 'Chloe', 'Ryan', 'Penelope',
    'Nathan', 'Layla', 'Caleb', 'Riley', 'Christian', 'Zoey', 'Dylan',
    'Nora', 'Isaac', 'Lily', 'Andrew', 'Eleanor', 'Joshua',
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
    'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
    'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
    'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
    'Carter', 'Roberts',
];

const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Australia', 'Japan', 'Brazil', 'India', 'Netherlands',
    'Sweden', 'Singapore', 'South Korea', 'Spain', 'Italy',
];


function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.toISOString().split('T')[0];
}

export function generateMockRecords(count: number = 200): DataRecord[] {
    const records: DataRecord[] = [];
    for (let i = 0; i < count; i++) {
        const firstName = randomItem(firstNames);
        const lastName = randomItem(lastNames);
        const category = randomItem(CATEGORIES as unknown as string[]);
        records.push({
            id: `REC-${String(i + 1).padStart(4, '0')}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            category: category as DataRecord['category'],
            status: randomItem(STATUSES as unknown as string[]) as DataRecord['status'],
            revenue: category === 'Enterprise'
                ? Math.round(Math.random() * 50000 + 10000)
                : category === 'SMB'
                    ? Math.round(Math.random() * 10000 + 1000)
                    : category === 'Startup'
                        ? Math.round(Math.random() * 5000 + 200)
                        : Math.round(Math.random() * 500 + 10),
            sessions: Math.floor(Math.random() * 500 + 1),
            date: randomDate(new Date('2025-01-01'), new Date('2026-02-26')),
            country: randomItem(countries),
            plan: randomItem(PLANS as unknown as string[]) as DataRecord['plan'],
        });
    }
    return records;
}

export function generateChartData(): ChartDataPoint[] {
    return MONTHS.map((month) => ({
        month,
        users: Math.floor(Math.random() * 5000 + 1000),
        revenue: Math.round(Math.random() * 100000 + 20000),
        sessions: Math.floor(Math.random() * 20000 + 5000),
    }));
}

// Simulate an API call with random delay & occasional failure
export function mockFetchData(): Promise<{
    records: DataRecord[];
    chartData: ChartDataPoint[];
}> {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 800 + 400; // 400‑1200ms
        const shouldFail = Math.random() < 0.05; // 5 % failure rate

        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('Network error: failed to fetch dashboard data'));
            } else {
                resolve({
                    records: generateMockRecords(200),
                    chartData: generateChartData(),
                });
            }
        }, delay);
    });
}
