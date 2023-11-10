import { Input, Output } from '../types';
import { brutForce } from './brutForce';
import { vogelsApproximation } from './vogelsApproximation';
import {
  mapTasksInputToTransportationProblemInput,
  mapTransportationProblemOutputToTasksOutput,
} from './vogelsApproximation/mappers';

export const method = (input: Input): Output => {
  // todo: Add validation of input data here
  /**
   * A worker can't perform any tasks
   * A task can't be performed by any worker
   * Empty list of workers or tasks: How the function behaves with no data.
   * Only one worker and multiple tasks, or only one task and multiple workers: This will test the extremes of a single row or single column.
   */
  return brutForce(input);
  // TODO: doesn't work with 1 worker
  // return mapTransportationProblemOutputToTasksOutput(
  //   vogelsApproximation(mapTasksInputToTransportationProblemInput(input)),
  // );
};
