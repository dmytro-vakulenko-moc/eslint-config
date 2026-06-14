import { computed, type ComputedRef, type Ref, ref } from 'vue';

import type { Task, TaskStatus } from '@/types/task';

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  done: 'done',
  in_progress: 'done',
  todo: 'in_progress',
};

const SEED_TASKS: readonly Task[] = [
  { id: 't-1', status: 'todo', title: 'Draft the board layout' },
  { id: 't-2', status: 'in_progress', title: 'Wire up the task store' },
  { id: 't-3', status: 'done', title: 'Adopt the shared lint config' },
];

/** The reactive task state and actions returned by {@link useTasks}. */
export interface UseTasks {
  addTask: (title: string) => void;
  advance: (id: string) => void;
  count: ComputedRef<number>;
  tasks: Ref<Task[]>;
}

/**
 * Provides reactive task state and the operations that mutate it.
 * @returns The reactive tasks plus add and advance actions.
 */
export function useTasks(): UseTasks {
  const tasks = ref<Task[]>(SEED_TASKS.map((task) => ({ ...task })));
  const count = computed(() => tasks.value.length);

  const addTask = (title: string): void => {
    tasks.value.push({ id: `t-${String(tasks.value.length + 1)}`, status: 'todo', title });
  };

  const advance = (id: string): void => {
    tasks.value = tasks.value.map((task) => (task.id === id ? { ...task, status: NEXT_STATUS[task.status] } : task));
  };

  return { addTask, advance, count, tasks };
}
