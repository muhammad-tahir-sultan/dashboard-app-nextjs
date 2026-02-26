import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@/components/Card/Card';

describe('Card Component', () => {
    const defaultProps = {
        title: 'Total Users',
        value: '1,234',
        icon: <span data-testid="icon">icon</span>,
        color: 'blue' as const,
        trend: { value: 10, isUp: true },
    };

    it('renders the title and value correctly', () => {
        render(<Card {...defaultProps} />);
        expect(screen.getByText('Total Users')).toBeInTheDocument();
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders the icon', () => {
        render(<Card {...defaultProps} />);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('displays the trend percentage', () => {
        render(<Card {...defaultProps} />);
        expect(screen.getByText('↑ 10%')).toBeInTheDocument();
    });

    it('displays a negative trend percentage', () => {
        render(<Card {...defaultProps} trend={{ value: 5, isUp: false }} />);
        expect(screen.getByText('↓ 5%')).toBeInTheDocument();
    });
});
