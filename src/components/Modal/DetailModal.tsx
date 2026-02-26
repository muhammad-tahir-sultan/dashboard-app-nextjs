'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/features/uiSlice';
import { selectFilteredRecords } from '@/features/dataSlice';
import { formatCurrency, formatDate } from '@/utils/formatters';

const DetailModal = memo(function DetailModal() {
    const dispatch = useAppDispatch();
    const modalRecordId = useAppSelector((s) => s.ui.modalRecordId);
    const records = useAppSelector(selectFilteredRecords);

    const record = useMemo(
        () => records.find((r) => r.id === modalRecordId) ?? null,
        [records, modalRecordId]
    );

    const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);

    return (
        <AnimatePresence>
            {record && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-full max-w-lg mx-4 rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800/60">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{record.name}</h2>
                                <p className="text-xs text-gray-500 mt-0.5">{record.email}</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="p-6 grid grid-cols-2 gap-4">
                            {[
                                { label: 'Record ID', value: record.id },
                                { label: 'Category', value: record.category },
                                { label: 'Status', value: record.status },
                                { label: 'Plan', value: record.plan },
                                { label: 'Revenue', value: formatCurrency(record.revenue) },
                                { label: 'Sessions', value: String(record.sessions) },
                                { label: 'Joined', value: formatDate(record.date) },
                                { label: 'Country', value: record.country },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                                </div>
                            ))}
                        </div>
                        {/* Footer */}
                        <div className="px-6 pb-6">
                            <button
                                onClick={handleClose}
                                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default DetailModal;
