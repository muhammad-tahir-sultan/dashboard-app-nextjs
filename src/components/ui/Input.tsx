import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wider opacity-80">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={`
                        w-full bg-card border border-border rounded-xl py-2 px-3 text-sm 
                        text-foreground transition-all outline-none
                        hover:border-indigo-500/30 focus:border-indigo-500/50 
                        focus:ring-2 focus:ring-indigo-500/10
                        placeholder:text-muted-foreground/60
                        ${icon ? 'pl-10' : ''}
                        ${className}
                    `}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
