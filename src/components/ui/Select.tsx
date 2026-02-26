import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wider opacity-80">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={`
                        w-full bg-card border border-border rounded-xl py-2 pl-3 pr-10 text-sm 
                        text-foreground transition-all outline-none cursor-pointer
                        appearance-none hover:border-indigo-500/30
                        focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10
                        ${className}
                    `}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Select;
