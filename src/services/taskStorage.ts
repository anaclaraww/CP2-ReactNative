import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow:tasks';

export const taskStorage = {
  async getAll(): Promise<Task[]> {
    try {
      const raw = await AsyncStorage.getItem(TASKS_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  },

  async save(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch {
      // silently fail
    }
  },

  async create(task: Task): Promise<void> {
    const tasks = await taskStorage.getAll();
    tasks.unshift(task);
    await taskStorage.save(tasks);
  },

  async update(updated: Task): Promise<void> {
    const tasks = await taskStorage.getAll();
    const index = tasks.findIndex((t) => t.id === updated.id);
    if (index >= 0) {
      tasks[index] = updated;
      await taskStorage.save(tasks);
    }
  },

  async remove(id: string): Promise<void> {
    const tasks = await taskStorage.getAll();
    const filtered = tasks.filter((t) => t.id !== id);
    await taskStorage.save(filtered);
  },
};
