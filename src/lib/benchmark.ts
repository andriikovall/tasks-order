import sampleInputs from '../assets/generated.json';
import { balance } from './balance/balance';
import { brutForce } from './brutForce';
import { visualize } from './utils/visualisation';
import { vogelsApproximation } from './vogelsApproximation';
import {
  mapTasksInputToTransportationProblemInput,
  mapTransportationProblemOutputToTasksOutput,
} from './vogelsApproximation/mappers';

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

// make a benchmark for each input for brutForce
// for (const input of sampleInputs) {
//   benchmark(() => {
//     brutForce(input);
//   }, `brutForce for ${input.tasks.length} tasks and ${input.workers.length} workers`);
// }

for (const input of sampleInputs) {
  benchmark(() => {
    balance(
      mapTransportationProblemOutputToTasksOutput(
        vogelsApproximation(mapTasksInputToTransportationProblemInput(input)),
      ),
    );
  }, `vogelsApproximation with default balancing for ${input.tasks.length} tasks and ${input.workers.length} workers`);
}
// for (const input of sampleInputs) {
//   benchmark(() => {
//     mapTransportationProblemOutputToTasksOutput(
//       vogelsApproximation(mapTasksInputToTransportationProblemInput(input)),
//     );
//   }, `vogelsApproximation for ${input.tasks.length} tasks and ${input.workers.length} workers`);
// }


export {};
