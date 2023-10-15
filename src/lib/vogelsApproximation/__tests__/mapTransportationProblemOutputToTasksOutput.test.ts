import { Output, Task } from '../../../types';
import { mapTransportationProblemOutputToTasksOutput } from '../mappers';
import { TransportationProblemOutput } from '../types';

describe('mapTransportationProblemOutputToTasksOutput', () => {
  it.each<{ input: TransportationProblemOutput; output: Output }>([
    {
      input: {
        allocations: [
          {
            supplier: { id: '1', name: 'Worker 1' },
            destination: { id: '1', name: 'Task 1' },
            allocatedAmount: 1,
          },
          {
            supplier: { id: '1', name: 'Worker 1' },
            destination: { id: '2', name: 'Task 2' },
            allocatedAmount: 1,
          },
          {
            supplier: { id: '2', name: 'Worker 2' },
            destination: { id: '3', name: 'Task 3' },
            allocatedAmount: 1,
          },
        ],
      },
      output: {
        result: {
          '1': [
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
          ],
          '2': [
            {
              id: '3',
              name: 'Task 3',
              duration: 3,
              canBeDoneBy: ['2'],
              priority: 4,
            },
          ],
        },
      },
    },
  ])(
    'should map transportation problem output to tasks output correctly',
    ({ input, output }) => {
      const result = mapTransportationProblemOutputToTasksOutput(input);

      expect(result).toEqual(output);
    },
  );
});
