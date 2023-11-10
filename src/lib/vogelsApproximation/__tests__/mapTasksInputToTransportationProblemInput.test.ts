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
          [1, 2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
          [1, 2, 3, Number.MAX_SAFE_INTEGER],
          [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            4,
          ],
        ],
        demands: [
          expect.objectContaining({ id: '1', name: 'Task 1', demand: 1 }),
          expect.objectContaining({ id: '2', name: 'Task 2', demand: 2 }),
          expect.objectContaining({ id: '3', name: 'Task 3', demand: 3 }),
          expect.objectContaining({ id: '4', name: 'Task 4', demand: 4 }),
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
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
