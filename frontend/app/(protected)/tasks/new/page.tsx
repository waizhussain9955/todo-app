"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "@/components/forms/TaskForm";
import { Button } from "@/components/ui/Button";
import type { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask, isLoading } = useTasks();

  const handleSubmit = async (data: CreateTaskRequest | UpdateTaskRequest) => {
    await createTask(data as CreateTaskRequest);
    router.push("/tasks");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <Link
          href="/tasks"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary-100/40 hover:text-primary-400 transition-all italic group"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Abort Integration
        </Link>
      </div>

      <div className="bg-surface-card backdrop-blur-xl p-8 md:p-12 border border-white/[0.08] rounded-[2rem] shadow-neon-glow">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tighter">
          Initialize <span className="text-transparent bg-clip-text bg-main-gradient">Vector.</span>
        </h1>
        <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
