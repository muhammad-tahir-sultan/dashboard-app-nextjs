export const CATEGORIES = ['Enterprise', 'SMB', 'Startup', 'Individual'] as const;
export const STATUSES = ['Active', 'Inactive', 'Pending', 'Churned'] as const;
export const PLANS = ['Free', 'Basic', 'Pro', 'Enterprise'] as const;

export const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

export const STATUS_COLORS = {
    Active: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    Inactive: 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/30',
    Pending: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
    Churned: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30',
} as const;
