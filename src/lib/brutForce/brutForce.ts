import { Input, Output, Task } from '../../types';
import { getDuration, getMaxDuration } from '../utils/duration';
import { visualize } from '../utils/visualisation';

/**
 * This method is theoretically correct for a small number of tasks and workers
 *
 * It uses the combinations method to find all possible combinations of tasks
 */
// todo: remove idle tasks when khitsko is OK with that
export const brutForce = (input: Input): Output => {
  const { workers, tasks } = input;
  const allPossibleResults = getAllPossibleTasksAssignments(tasks);
  const allPossibleResultsSortedByPriority =
    sortAllTasksByPriorityInPlace(allPossibleResults);
  const bestResult = getShortestMaximalDuration(
    allPossibleResultsSortedByPriority,
  );
  return {
    result: bestResult,
  };
};

const sortAllTasksByPriorityInPlace = (
  notSorted: Record<string, Task[]>[],
): Record<string, Task[]>[] => {
  return notSorted.map(tasks => {
    for (const workerId in tasks) {
      const tasksForWorker = tasks[workerId];
      sortByPriorityInPlace(tasksForWorker);
    }
    return tasks;
  });
};

const sortByPriorityInPlace = (tasks: Task[]): void => {
  tasks.sort((a, b) => b.priority - a.priority);
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
