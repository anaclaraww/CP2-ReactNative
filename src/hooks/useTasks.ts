import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '../types/task';
import { useTaskContext, CreateTaskInput } from '../context/TaskContext';

type FilterOption = 'todos' | TaskStatus;

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  filter: FilterOption;
  searchQuery: string;
  setFilter: (f: FilterOption) => void;
  setSearchQuery: (q: string) => void;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, input: Partial<CreateTaskInput>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

export function useTasks(): UseTasksReturn {
  const ctx = useTaskContext();
  const [filter, setFilter] = useState<FilterOption>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return ctx.tasks.filter((task) => {
      const matchFilter = filter === 'todos' || task.status === filter;
      const matchSearch =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [ctx.tasks, filter, searchQuery]);

  return {
    tasks: ctx.tasks,
    filteredTasks,
    isLoading: ctx.isLoading,
    filter,
    searchQuery,
    setFilter,
    setSearchQuery,
    createTask: ctx.createTask,
    updateTask: ctx.updateTask,
    deleteTask: ctx.deleteTask,
    getTaskById: ctx.getTaskById,
  };
}
