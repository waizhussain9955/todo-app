"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { register as registerUser } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { registerSchema, type RegisterSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function RegisterForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { refreshSession, session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to tasks after successful registration
  useEffect(() => {
    if (session && mounted) {
      router.push("/tasks");
    }
  }, [session, router, mounted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await registerUser(data.email, data.password, data.name || undefined);
      await refreshSession();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {error && (
        <div className="p-4 text-xs font-bold uppercase tracking-widest border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl animate-pulse">
          Error: {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-secondary-text ml-1">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          className="premium-input w-full"
          autoComplete="name"
          disabled={isLoading}
          {...register("name")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-secondary-text ml-1">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          className="premium-input w-full"
          autoComplete="email"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wider text-secondary-text ml-1">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="premium-input w-full"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[11px] font-bold uppercase tracking-wider text-secondary-text ml-1">Confirm</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="premium-input w-full"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="premium-button w-full bg-main-gradient text-white shadow-neon-glow hover:opacity-90 py-6 mt-4" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        ) : "Create Account"}
      </Button>
    </form>
  );
}
