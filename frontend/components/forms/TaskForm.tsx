"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/useCategories";
import { createTaskSchema, type CreateTaskSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: task
      ? {
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        categoryId: task.categoryId || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      }
      : {
        priority: "medium",
        categoryId: "",
      },
  });

  const onFormSubmit = async (data: CreateTaskSchema) => {
    setSubmitError(null);
    try {
      const submitData: CreateTaskRequest | UpdateTaskRequest = {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        categoryId: data.categoryId || undefined,
        dueDate: data.dueDate || undefined,
      };
      await onSubmit(submitData);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8" noValidate>
      {submitError && (
        <div
          className="p-4 text-[10px] font-black uppercase tracking-widest border border-rose-500/20 bg-rose-500/10 text-rose-500 rounded-2xl animate-in shake duration-500"
          role="alert"
        >
          System Error: {submitError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="ml-1">Task Identification *</Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Design System Overhaul"
          className="w-full"
          disabled={isLoading}
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest ml-1 mt-1" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="ml-1">Notes & Neural Context</Label>
        <textarea
          id="description"
          className="flex w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition-all duration-300 backdrop-blur-md shadow-inner placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white/[0.08] min-h-[140px] resize-none"
          placeholder="Define the scope and objectives for this task vector..."
          disabled={isLoading}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest ml-1 mt-1" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="priority" className="ml-1">Priority Vector</Label>
          <Select
            id="priority"
            className="w-full"
            options={[
              { value: "low", label: "Low Impact" },
              { value: "medium", label: "Standard Operational" },
              { value: "high", label: "Critical Priority" },
            ]}
            disabled={isLoading}
            {...register("priority")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId" className="ml-1">System Category</Label>
          <Select
            id="categoryId"
            className="w-full"
            options={[
              { value: "", label: "Uncategorized" },
              ...categories.map(c => ({ value: c.id, label: c.name }))
            ]}
            disabled={isLoading}
            {...register("categoryId")}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dueDate" className="ml-1">Termination Date</Label>
          <Input
            id="dueDate"
            type="date"
            className="w-full [color-scheme:dark]"
            disabled={isLoading}
            {...register("dueDate")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-white/5">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Abort
          </Button>
        )}
        <Button 
          type="submit" 
          className="px-16" 
          isLoading={isLoading}
        >
          {task ? "Update Vector" : "Initialize Task"}
        </Button>
      </div>
    </form>
  );
}
