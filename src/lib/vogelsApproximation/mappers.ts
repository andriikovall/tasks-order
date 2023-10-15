import { Input, Output, Task, Worker } from '../../types';
import {
  TransportationProblemInput,
  TransportationProblemOutput,
} from './types';

// todo: test
export const mapTasksInputToTransportationProblemInput = (
  input: Input,
): TransportationProblemInput => {
  const costs = input.workers.map(worker => {
    return input.tasks.map(task => {
      if (task.canBeDoneBy.includes(worker.id)) {
        return task.duration;
      }
      return Number.POSITIVE_INFINITY;
    });
  });

  const suppliers = input.workers.map(worker => ({
    id: worker.id,
    name: worker.name,
    supply: Number.POSITIVE_INFINITY,
  }));

  const demands = input.tasks.map(task => ({
    id: task.id,
    name: task.name,
    demand: task.duration,
  }));

  return {
    costs,
    suppliers,
    demands,
  };
};

// todo: test
export const mapTransportationProblemOutputToTasksOutput = (
  output: TransportationProblemOutput<Worker, Task>,
): Output => {
  const result: Record<Worker['id'], Task[]> = {};

  output.allocations.forEach(allocation => {
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
