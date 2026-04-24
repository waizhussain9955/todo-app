"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Plus, Trash2, Edit3, Check, Filter, LayoutGrid, List } from "lucide-react";
import type { TaskFilters, TaskStatus, TaskPriority } from "@/types/task";
import { formatDate } from "@/lib/utils";

export default function TasksPage() {
  const router = useRouter();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    updateTask,
    deleteTask,
    setTasks,
  } = useTasks();

  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const newStatus: TaskStatus =
        task.status === "completed" ? "pending" : "completed";

      setCompletingId(id);
      try {
        await updateTask(id, { status: newStatus });
      } catch (err) {
        console.error("Failed to toggle task:", err);
      } finally {
        setCompletingId(null);
      }
    },
    [tasks, updateTask]
  );

  const handleDeleteClick = useCallback((id: string) => {
    setTaskToDelete(id);
    setShowDeleteDialog(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!taskToDelete) return;

    setDeletingId(taskToDelete);
    setShowDeleteDialog(false);
    try {
      await deleteTask(taskToDelete);
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setDeletingId(null);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const handleFilterChange = useCallback(
    async (filters: any) => {
      await fetchTasks(filters as TaskFilters);
    },
    [fetchTasks]
  );

  const handleClearFilters = useCallback(() => {
    setTasks([]);
    fetchTasks();
  }, [setTasks, fetchTasks]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center p-12 rounded-3xl bg-white/5 border border-white/5">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Sync Error</h3>
          <p className="text-secondary-text mb-8">{error}</p>
          <button 
            onClick={() => fetchTasks()}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-neon animate-pulse"></div>
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Workspace Terminal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
            Task <span className="text-transparent bg-clip-text bg-main-gradient">Repository.</span>
          </h1>
          <p className="text-secondary-text mt-4 text-sm font-medium opacity-80">Synchronizing {tasks.length} active process vectors in your current deployment cycle.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-1.5 backdrop-blur-md">
            <button 
                onClick={() => setViewMode("kanban")}
                className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "kanban" ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white"}`}
            >
                <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "list" ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white"}`}
            >
                <List className="w-4 h-4" />
            </button>
          </div>
          <Link href="/tasks/new">
            <button className="px-8 py-4 bg-main-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon hover:shadow-neon-premium transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              New Entry
            </button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-card backdrop-blur-xl border border-white/[0.05] p-6 rounded-[2rem] shadow-neon-glow-soft">
        <TaskFilter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      </div>

      {isLoading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-xs font-bold text-secondary-text uppercase tracking-widest animate-pulse">Syncing Workspace...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="p-20 text-center rounded-3xl bg-white/5 border border-white/5 border-dashed">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-white/10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Vectors Found</h3>
            <p className="text-secondary-text mb-8">Your current filter parameters yielded zero results.</p>
            <button 
                onClick={handleClearFilters}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
            >
                Reset Filters
            </button>
        </div>
      ) : viewMode === "kanban" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Kanban Columns */}
          {[
            { id: "pending", label: "Backlog", color: "bg-slate-500", count: tasks.filter(t => t.status === 'pending').length },
            { id: "in_progress", label: "Active", color: "bg-blue-500", count: tasks.filter(t => t.status === 'in_progress').length },
            { id: "completed", label: "Archived", color: "bg-emerald-500", count: tasks.filter(t => t.status === 'completed').length }
          ].map((column) => (
            <div key={column.id} className="space-y-6">
              <div className="flex items-center justify-between px-2 mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">{column.label}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-secondary-text font-bold">
                    {column.count}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {tasks.filter(t => t.status === column.id).map((task) => (
                  <div key={task.id} className="group relative p-7 rounded-[1.5rem] bg-surface-card backdrop-blur-xl border border-white/[0.05] hover:border-primary-500/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-neon-glow-soft">
                    <div className="absolute inset-0 bg-main-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-5">
                            <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-[0.15em] border ${
                                task.priority === 'high' ? 'text-rose-400 border-rose-400/20 bg-rose-400/5' :
                                task.priority === 'medium' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                                'text-blue-400 border-blue-400/20 bg-blue-400/5'
                            }`}>
                                {task.priority}
                            </span>
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                <button onClick={() => router.push(`/tasks/${task.id}`)} className="p-2 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDeleteClick(task.id)} className="p-2 hover:bg-rose-500/10 rounded-xl text-white/40 hover:text-rose-500 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h4 className="text-lg text-white font-black mb-2 tracking-tight group-hover:text-primary-400 transition-colors truncate">{task.title}</h4>
                        
                        {task.description && (
                            <p className="text-xs text-secondary-text line-clamp-2 mb-4 leading-relaxed">{task.description}</p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">
                                {formatDate(task.dueDate || task.createdAt)}
                            </span>
                            <button 
                                onClick={() => handleToggleComplete(task.id)}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                    task.status === 'completed' 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-white/5 text-white/20 hover:bg-primary-500/10 hover:text-primary-400 border border-white/5'
                                }`}
                            >
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {completingId === task.id && (
                      <div className="absolute inset-0 bg-surface-dark/60 backdrop-blur-sm flex items-center justify-center z-20">
                        <LoadingSpinner size="sm" />
                      </div>
                    )}
                  </div>
                ))}
                
                <button 
                    onClick={() => router.push("/tasks/new")}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 text-white/10 hover:border-white/10 hover:bg-white/[0.02] hover:text-white/40 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <Plus className="w-3.5 h-3.5" />
                    New Integration
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pb-12">
            <TaskList 
                tasks={tasks} 
                isLoading={isLoading} 
                onToggleComplete={handleToggleComplete} 
                onDelete={handleDeleteClick} 
                viewMode="list" 
                completingId={completingId}
            />
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Purge Vector"
        message="Are you sure you want to permanently delete this task from the workspace core?"
        confirmLabel="Initiate Purge"
        variant="danger"
        isLoading={!!deletingId}
      />
    </div>
  );
}
