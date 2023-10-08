import { Task } from '../../types';

export const getDuration = (tasks: Task[]): number => {
  return tasks.reduce((acc, task) => acc + task.duration, 0);
};

export const getMaxDuration = (
  output: Record<string, Task[]>,
): number => {
  const durations = Object.values(output).map(getDuration);
  return Math.max(...durations);
};
