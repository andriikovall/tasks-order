import { Input, Output, Task } from '../../types';
import { method } from '../method';
import { getDuration } from '../utils/duration';

describe('method', () => {
  it('should return an empty object if no workers or tasks are provided', () => {
    const input: Input = {
      workers: [],
      tasks: [],
    };
    const expectedOutput: Output = {
      result: {},
    };
    const actualOutput = method(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should assign all tasks to a single worker if there is only one worker', () => {
    const input: Input = {
      workers: [{ id: '1', name: 'Worker 1' }],
      tasks: [
        {
          id: '1',
          name: 'Task 1',
          duration: 1,
          canBeDoneBy: ['1'],
          priority: 1,
        },
        {
          id: '2',
          name: 'Task 2',
          duration: 2,
          canBeDoneBy: ['1'],
          priority: 1,
        },
      ],
    };
    const expectedOutput: Output = {
      result: {
        '1': [
          {
            id: '1',
            name: 'Task 1',
            duration: 1,
            canBeDoneBy: ['1'],
            priority: 1,
          },
          {
            id: '2',
            name: 'Task 2',
            duration: 2,
            canBeDoneBy: ['1'],
            priority: 1,
          },
        ],
      },
    };
    const actualOutput = method(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should assign tasks to workers based on their min time', () => {
    const input: Input = {
      workers: [
        { id: '1', name: 'Worker 1' },
        { id: '2', name: 'Worker 2' },
      ],
      tasks: [
        {
          id: '2',
          name: 'Task 2',
          duration: 2,
          canBeDoneBy: ['1', '2'],
          priority: 3,
        },
        {
          id: '1',
          name: 'Task 1',
          duration: 1,
          canBeDoneBy: ['1', '2'],
          priority: 4,
        },
        {
          id: '3',
          name: 'Task 3',
          duration: 3,
          canBeDoneBy: ['1', '2'],
          priority: 2,
        },
        {
          id: '4',
          name: 'Task 4',
          duration: 4,
          canBeDoneBy: ['1', '2'],
          priority: 1,
        },
      ],
    };

    const output = method(input);
    expect(getDuration(output.result['1'])).toEqual(5);
    expect(getDuration(output.result['2'])).toEqual(5);
  });
});
