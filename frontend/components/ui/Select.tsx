import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: string;
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, label, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-[10px] font-black text-secondary-text uppercase tracking-[0.2em] px-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            className={cn(
              "flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-2 text-sm text-white transition-all duration-300 backdrop-blur-md shadow-inner appearance-none cursor-pointer",
              "focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white/[0.08]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-500/50 focus:ring-rose-500/10",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#111827] text-white">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-[10px] text-rose-500 font-black uppercase tracking-widest px-2 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
