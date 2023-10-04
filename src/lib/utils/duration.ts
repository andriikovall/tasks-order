import { ResultTask } from '../../types';

export const getDuration = (tasks: ResultTask[]): number => {
  return tasks.reduce((acc, task) => acc + task.duration, 0);
};

export const getMaxDuration = (
  output: Record<string, ResultTask[]>,
): number => {
  const durations = Object.values(output).map(getDuration);
  return Math.max(...durations);
};
