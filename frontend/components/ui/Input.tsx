import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-2 text-sm text-white transition-all duration-300 backdrop-blur-md shadow-inner",
            "placeholder:text-white/20 font-medium",
            "focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white/[0.08]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-500/50 focus:ring-rose-500/10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
