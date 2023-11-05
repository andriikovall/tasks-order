import { Output, Task } from '../../types';
import { getDuration } from '../utils/duration';
import { TransportationProblemOutput } from '../vogelsApproximation/types';

type WorkerID = string;

/**
 * This method is intended to balance the output of the 2 first algorithms.
 *
 * This is mostly heuristic alg.
 *
 * This is non pure function
 */
export const balance = (output: Output, numberOfWorkers?: number): Output => {
  // we are making the default number of the workers to balance to be 1/3 of the number of the workers
  const maxWorkersCount =
    numberOfWorkers ?? Math.floor(Object.keys(output.result).length / 3);

  const timeCounts: Record<WorkerID, number> = {};
  const workersSorted: [WorkerID, Task[]][] = Object.entries(
    output.result,
  ).sort((a, b) => {
    const aTime = timeCounts[a[0]] ?? getDuration(a[1]);
    const bTime = timeCounts[b[0]] ?? getDuration(b[1]);
    timeCounts[a[0]] = aTime;
    timeCounts[b[0]] = bTime;

    return aTime - bTime;
  });

  let leastTimeWorkerIndex = 0;
  for (
    let i = workersSorted.length - 1;
    i > workersSorted.length - 1 - maxWorkersCount;
    i--
  ) {
    if (i <= leastTimeWorkerIndex) {
      break;
    }
    const [maxWorkerId, maxWorkerTasks] = workersSorted[i];
    const [minWorkerId, minWorkerTasks] = workersSorted[leastTimeWorkerIndex];
    for (let j = 0; j < maxWorkerTasks.length; j++) {
      const task = maxWorkerTasks[j];
      if (
        task.canBeDoneBy.includes(minWorkerId) &&
        timeCounts[maxWorkerId] - task.duration >=
          timeCounts[minWorkerId] + task.duration
      ) {
        minWorkerTasks.push(task);
        maxWorkerTasks.splice(j, 1);
        // console.log('maxWorkerTasks:', maxWorkerTasks);
        // console.log('minWorkerTasks:', minWorkerTasks);

        timeCounts[maxWorkerId] -= task.duration;
        timeCounts[minWorkerId] += task.duration;
      }
      if (timeCounts[maxWorkerId] <= timeCounts[minWorkerId]) {
        leastTimeWorkerIndex += 1;
        break;
      }
    }
  }

  return output;
};
