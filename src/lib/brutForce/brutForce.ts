import { Input, Output, ResultTask, Task } from '../../types';
import { getDuration, getMaxDuration } from '../utils';

/**
 * This method is theoretically correct for a small number of tasks and workers
 *
 * It uses the combinations method to find all possible combinations of tasks
 */
// todo: add idle tasks here in the end results
// todo: add dependencies management
export const brutForce = (input: Input): Output => {
  const { workers, tasks } = input;
  const possibleResults = getAllPossibleTasksAssignments(tasks);
  // todo: dependency management and then idle tasks
  const bestResult = getShortestMaximalDuration(possibleResults);
  return {
    result: bestResult,
  };
};

const getShortestMaximalDuration = (
  allPossibleTaskAssignments: Record<string, ResultTask[]>[],
): Record<string, ResultTask[]> => {
  return allPossibleTaskAssignments.reduce((shortest, current) => {
    const currentMaxDuration = getMaxDuration(current);
    const shortestMaxDuration = getMaxDuration(shortest);
    return currentMaxDuration < shortestMaxDuration ? current : shortest;
  }, allPossibleTaskAssignments[0]);
};

const getAllPossibleTasksAssignments = (
  remainingTasks: Task[],
  currentAssignment: Record<string, Task[]> = {},
): Output['result'][] => {
  if (remainingTasks.length === 0) {
    return [currentAssignment];
  }

  const task = remainingTasks[0];
  let results: Output['result'][] = [];

  for (const workerId of task.canBeDoneBy) {
    const tasksForWorker = [...(currentAssignment[workerId] || []), task];

    const newAssignments = getAllPossibleTasksAssignments(remainingTasks.slice(1), {
      ...currentAssignment,
      [workerId]: tasksForWorker,
    });
    results = results.concat(newAssignments);
  }

  return results;
};
