import { Input, Output, Task, Worker } from '../../types';
import {
  TransportationProblemInput,
  TransportationProblemOutput,
} from './types';

export const mapTasksInputToTransportationProblemInput = (
  input: Input,
): TransportationProblemInput<Worker, Task> => {
  const costs = input.workers.map(worker => {
    return input.tasks.map(task => {
      if (task.canBeDoneBy.includes(worker.id)) {
        return task.duration;
      }
      return Number.MAX_SAFE_INTEGER;
    });
  });

  const suppliers = input.workers.map(worker => ({
    id: worker.id,
    name: worker.name,
    supply: Number.MAX_SAFE_INTEGER,
  }));

  const demands = input.tasks.map(task => ({
    ...task,
    demand: task.duration,
  }));

  return {
    costs,
    suppliers,
    demands,
  };
};

export const mapTransportationProblemOutputToTasksOutput = (
  output: TransportationProblemOutput<Worker, Task>,
): Output => {
  const result: Record<Worker['id'], Task[]> = {};

  output?.allocations?.forEach(allocation => {
    if (!result[allocation.supplier.id]) {
      result[allocation.supplier.id] = [];
    }
    result[allocation.supplier.id].push({
      ...allocation.destination,
      id: allocation.destination.id,
      name: allocation.destination.name,
    });
  });

  return { result };
};
