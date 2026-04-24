"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Trash2, Clock, Calendar, BarChart3 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  isCompleting,
}: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const priorityColors = {
    high: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  };

  return (
    <div
      className={`group relative p-7 rounded-[1.5rem] bg-surface-card backdrop-blur-xl border border-white/[0.05] hover:border-primary-500/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-neon-glow-soft ${
        isCompleted ? "opacity-60" : ""
      }`}
    >
      <div className="absolute inset-0 bg-main-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${
            priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.low
          }`}>
            {task.priority} Priority
          </div>
          <Checkbox
            checked={isCompleted}
            onChange={() => onToggleComplete(task.id)}
            disabled={isCompleting}
            className="w-5 h-5 rounded-lg border-white/10 checked:bg-primary-500 checked:border-primary-500"
          />
        </div>

        <Link href={`/tasks/${task.id}`} className="block mb-3">
          <h3 className={`text-xl font-bold transition-colors ${
            isCompleted ? "text-secondary-text line-through" : "text-white group-hover:text-primary-400"
          }`}>
            {task.title}
          </h3>
        </Link>

        {task.description && (
          <p className="text-sm text-secondary-text line-clamp-2 mb-6 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Progress Section */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-3 h-3 text-secondary-text" />
                    <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">Status Matrix</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-green-400' : 'text-primary-400'}`}>
                    {isCompleted ? 'Verified' : 'Active'}
                </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-main-gradient shadow-neon'}`}
                    style={{ width: isCompleted ? '100%' : '35%' }}
                />
            </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-secondary-text">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">
                    {formatDate(task.dueDate || task.createdAt)}
                </span>
            </div>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-dark/60 backdrop-blur-sm z-20 transition-all">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
