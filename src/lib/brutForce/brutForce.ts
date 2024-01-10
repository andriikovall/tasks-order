import { Input, Output, Task } from '../../types';
import { getMaxDuration } from '../utils/duration';

/**
 * This method is theoretically correct for a small number of tasks and workers
 *
 * It uses the combinations method to find all possible combinations of tasks
 */
export const brutForce = (input: Input): Output => {
  const { workers, tasks } = input;
  const allPossibleResults = getAllPossibleTasksAssignments(tasks);
  const bestResult = getShortestMaximalDuration(
    allPossibleResults,
  );
  return {
    result: bestResult,
  };
};

const getShortestMaximalDuration = (
  allPossibleTaskAssignments: Record<string, Task[]>[],
): Record<string, Task[]> => {
  return allPossibleTaskAssignments.reduce((shortest, current) => {
    const currentMaxDuration = getMaxDuration(current);
    const shortestMaxDuration = getMaxDuration(shortest);
    return currentMaxDuration < shortestMaxDuration ? current : shortest;
  }, allPossibleTaskAssignments[0]);
};

const getAllPossibleTasksAssignments = (
  remainingTasks: Task[],
  currentAssignment: Record<string, Task[]> = {},
): Record<string, Task[]>[] => {
  if (remainingTasks.length === 0) {
    return [currentAssignment];
  }

  const task = remainingTasks[0];
  let results: Record<string, Task[]>[] = [];

  for (const workerId of task.canBeDoneBy) {
    const tasksForWorker = [...(currentAssignment[workerId] || []), task];

    const newAssignments = getAllPossibleTasksAssignments(
      remainingTasks.slice(1),
      {
        ...currentAssignment,
        [workerId]: tasksForWorker,
      },
    );
    results = results.concat(newAssignments);
  }

  return results;
};

