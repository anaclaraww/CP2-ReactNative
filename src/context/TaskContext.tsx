import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { taskStorage } from '../services/taskStorage';
import { generateId } from '../utils/generateId';

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
}

interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, input: Partial<CreateTaskInput>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  reload: () => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await taskStorage.getAll();
      setTasks(stored);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function createTask(input: CreateTaskInput): Promise<void> {
    const now = new Date().toISOString();
    const task: Task = {
      id: generateId(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    await taskStorage.create(task);
    setTasks((prev) => [task, ...prev]);
  }

  async function updateTask(
    id: string,
    input: Partial<CreateTaskInput>,
  ): Promise<void> {
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return;
    const updated: Task = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };
    await taskStorage.update(updated);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTask(id: string): Promise<void> {
    await taskStorage.remove(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function getTaskById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  }

  return (
    <TaskContext.Provider
      value={{ tasks, isLoading, createTask, updateTask, deleteTask, getTaskById, reload }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextData {
  return useContext(TaskContext);
}
