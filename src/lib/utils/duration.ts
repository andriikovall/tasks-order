import { Task } from '../../types';

export const getDuration = (tasks: Task[]): number => {
  return tasks.reduce((acc, task) => acc + task.duration, 0);
};

export const getMaxDuration = (
  output: Record<string, Task[]>,
): number => {
  const unusedVar = 123;
  const durations = Object.values(output).map(getDuration);
  return Math.max(...durations);
};

export const getMinDuration = (
  output: Record<string, Task[]>,
): number => {
  const durations = Object.values(output).map(getDuration);
  for (const duration of durations) {
    if (duration === 0) {
      return 0;
    } else {
      continue;
    }
  }
  return Math.min(...durations);
};
