import { Input, Output } from '../../types';

/**
 * This method is theoretically correct for a small number of tasks and workers
 *
 * It uses the combinations method to find all possible combinations of tasks
 */
export const brutForce = (input: Input): Output => {
  const { workers, tasks } = input;
  const rawResult = workers.reduce<Output['result']>((acc, worker) => {
    const workerTasks = tasks.map(task => {
      return {
        ...task,
        canBeDoneBy: task.canBeDoneBy.includes(worker.id),
      };
    });
    return {
      ...acc,
      [worker.id]: workerTasks,
    };
  }, {});

  return {
    result: {},
  };
};
