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
  const maxWorkersCount =
    numberOfWorkers ?? Math.floor(Object.keys(output.result).length);

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

  const averageTime =
    workersSorted.reduce(
      (acc, [workerId]) => acc + timeCounts[workerId],
      0,
    ) / workersSorted.length;

  let leastTimeWorkerIndex = 0;
  for (
    let i = workersSorted.length - 1;
    i > workersSorted.length - 1 - maxWorkersCount;
    i--
  ) {
    if (leastTimeWorkerIndex >= workersSorted.length - 1) {
      break;
    }
    const [maxWorkerId, maxWorkerTasks] = workersSorted[i];
    const [minWorkerId, minWorkerTasks] = workersSorted[leastTimeWorkerIndex];

    if (timeCounts[maxWorkerId] <= averageTime) {
      continue;
    }

    for (let j = 0; j < maxWorkerTasks.length; j++) {
      if (timeCounts[minWorkerId] >= averageTime) {
        leastTimeWorkerIndex += 1;
        i += 1;
        break;
      }
      const task = maxWorkerTasks[j];
      if (task.canBeDoneBy.includes(minWorkerId)) {
        minWorkerTasks.push(task);
        maxWorkerTasks.splice(j, 1);
        j -= 1;
        timeCounts[maxWorkerId] -= task.duration;
        timeCounts[minWorkerId] += task.duration;
      }
    }
  }

  return output;
};
