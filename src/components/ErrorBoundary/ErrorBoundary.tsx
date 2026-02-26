'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.fallback) return this.fallback;
            return (
                <div className="py-4">
                    <ErrorFallback
                        message={this.state.error?.message || "A component error occurred."}
                        onRetry={this.handleRetry}
                    />
                </div>
            );
        }

        return this.props.children;
    }

    private get fallback() {
        return this.props.fallback;
    }
}

export default ErrorBoundary;
