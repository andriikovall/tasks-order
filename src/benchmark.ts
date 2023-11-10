import sampleInputs from './assets/generated.json';
import { brutForce } from './lib/brutForce';
import { vogelsApproximation } from './lib/vogelsApproximation';
import {
  mapTasksInputToTransportationProblemInput,
  mapTransportationProblemOutputToTasksOutput,
} from './lib/vogelsApproximation/mappers';

const measure = (fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};

const benchmark = (fn: () => void, name: string) => {
  const time = measure(fn);
  console.log(`${name} took ${time}ms`);
};

for (const input of sampleInputs) {
  benchmark(() => {
    mapTransportationProblemOutputToTasksOutput(
      vogelsApproximation(mapTasksInputToTransportationProblemInput(input)),
    );
  }, `vogelsApproximation for ${input.tasks.length} tasks and ${input.workers.length} workers`);
}

export {};
