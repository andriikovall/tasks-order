import { Input } from '../../../types';
import { mapTasksInputToTransportationProblemInput } from '../mappers';
import { TransportationProblemInput } from '../types';

describe('mapTasksInputToTransportationProblemInput', () => {
  it.each<{ input: Input; output: TransportationProblemInput }>([
    {
      input: {
        workers: [
          { id: '1', name: 'Worker 1' },
          {
            id: '2',
            name: 'Worker 2',
          },
          {
            id: '3',
            name: 'Worker 3',
          },
        ],
        tasks: [
          {
            id: '1',
            name: 'Task 1',
            duration: 1,
            canBeDoneBy: ['1', '2'],
            priority: 2,
          },
          {
            id: '2',
            name: 'Task 2',
            duration: 2,
            canBeDoneBy: ['1', '2'],
            priority: 3,
          },
          {
            id: '3',
            name: 'Task 3',
            duration: 3,
            canBeDoneBy: ['2'],
            priority: 4,
          },
          {
            id: '4',
            name: 'Task 4',
            duration: 4,
            canBeDoneBy: ['3'],
            priority: 5,
          },
        ],
      },
      output: {
        costs: [
          [1, 2, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
          [1, 2, 3, Number.POSITIVE_INFINITY],
          [
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            4,
          ],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 1 },
          { id: '2', name: 'Task 2', demand: 2 },
          { id: '3', name: 'Task 3', demand: 3 },
          { id: '4', name: 'Task 4', demand: 4 },
        ],
        suppliers: [
          // todo: think about MAX_SAFE_INTEGER of something like that
          { id: '1', name: 'Worker 1', supply: Number.POSITIVE_INFINITY },
          { id: '2', name: 'Worker 2', supply: Number.POSITIVE_INFINITY },
          { id: '3', name: 'Worker 3', supply: Number.POSITIVE_INFINITY },
        ],
      },
    },
  ])(
    'should map tasks input to transportation problem input correctly',
    ({ input, output }) => {
      const result = mapTasksInputToTransportationProblemInput(input);

      expect(result).toEqual(output);
    },
  );
});
