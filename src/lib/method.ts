import { CONFIG } from '../config';
import { Input, Method, Output, OutputWithMeta } from '../types';
import { brutForce } from './brutForce';
import { vogelsApproximation } from './vogelsApproximation';
import {
  mapTasksInputToTransportationProblemInput,
  mapTransportationProblemOutputToTasksOutput,
} from './vogelsApproximation/mappers';

export const method = (
  input: Input,
): OutputWithMeta => {
  const workUnitsCount = input.workers.length * input.tasks.length;
  if (workUnitsCount <= CONFIG.MAX_BRUT_FORCE_WORK_UNITS) {
    return { ...brutForce(input), method: Method.BrutForce };
  }
  if (workUnitsCount > CONFIG.MAX_VOGELS_WORK_UNITS) {
    throw new Error(
      `Too many work units: ${workUnitsCount}. Max allowed: ${CONFIG.MAX_VOGELS_WORK_UNITS}`,
    );
  }
  const transportProblemResult = vogelsApproximation(
    mapTasksInputToTransportationProblemInput(input),
  );
  const tasksResult = mapTransportationProblemOutputToTasksOutput(
    transportProblemResult,
  );
  return { ...tasksResult, method: Method.Vogels };
};
