import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    const variants = {
      primary: "bg-main-gradient text-white shadow-neon hover:shadow-neon-premium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
      secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md",
      danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-300",
      ghost: "text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300",
    };

    const sizes = {
      sm: "px-4 py-2 text-[10px] font-black uppercase tracking-widest",
      md: "px-6 py-3 text-[11px] font-black uppercase tracking-[0.1em]",
      lg: "px-8 py-4 text-xs font-black uppercase tracking-[0.2em]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl transition-all duration-300",
          "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="flex items-center space-x-1.5 mr-3">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
