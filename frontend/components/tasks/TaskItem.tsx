"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Trash2, Calendar, Hash } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  isCompleting,
}: TaskItemProps) {
  const isCompleted = task.status === "completed";

  const priorityColors = {
    high: "text-rose-400 bg-rose-400/10",
    medium: "text-amber-400 bg-amber-400/10",
    low: "text-blue-400 bg-blue-400/10",
  };

  return (
    <div
      className={`group flex items-center gap-6 p-5 rounded-[1.25rem] border border-white/[0.05] transition-all duration-300 shadow-sm ${
        isCompleted ? "opacity-50 bg-white/[0.02]" : "bg-surface-card backdrop-blur-xl hover:border-primary-500/30 hover:shadow-neon-glow-soft"
      }`}
    >
      <Checkbox
        checked={isCompleted}
        onChange={() => onToggleComplete(task.id)}
        disabled={isCompleting}
        className="w-5 h-5 rounded-lg border-white/10 checked:bg-primary-500 checked:border-primary-500"
      />
      
      <div className="flex-1 min-w-0">
        <Link href={`/tasks/${task.id}`}>
          <h3 className={`font-bold transition-colors truncate ${
            isCompleted ? "text-secondary-text line-through" : "text-white group-hover:text-primary-400"
          }`}>
            {task.title}
          </h3>
        </Link>
        <div className="flex items-center gap-4 mt-1">
          <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest ${
            priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.low
          }`}>
            {task.priority}
          </span>
          {task.category && (
            <div className="flex items-center gap-1 text-secondary-text">
                <Hash className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                    {task.category.name}
                </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-secondary-text">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
                {formatDate(task.dueDate || task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 hover:bg-rose-500/10 rounded-lg text-white/20 hover:text-rose-500 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
