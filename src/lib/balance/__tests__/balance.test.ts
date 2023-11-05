import { Output } from '../../../types';
import { balance } from '../balance';

const genTask = (workerId: string, taskId: string, canBeDoneBy: string[]) => ({
  id: taskId,
  name: taskId,
  priority: 1,
  canBeDoneBy,
  duration: 1,
});

describe('balance', () => {
  it.each<{ before: Output; after: Output; workersToBalance?: number }>([
    {
      before: {
        result: {
          w1: [genTask('w1', 't1', ['w1'])],
          w2: [genTask('w2', 't2', ['w2']), genTask('w2', 't3', ['w2'])],
          w3: [
            genTask('w3', 't6', ['w1', 'w2', 'w3']),
            genTask('w3', 't7', ['w1', 'w2', 'w3']),
            genTask('w3', 't8', ['w1', 'w2', 'w3']),
          ],
        },
      },
      after: {
        result: {
          w1: [
            genTask('w1', 't1', ['w1']),
            genTask('w3', 't6', ['w1', 'w2', 'w3']),
          ],
          w2: [genTask('w2', 't2', ['w2']), genTask('w2', 't3', ['w2'])],
          w3: [
            genTask('w3', 't7', ['w1', 'w2', 'w3']),
            genTask('w3', 't8', ['w1', 'w2', 'w3']),
          ],
        },
      },
    },
    {
      before: {
        result: {
          w1: [genTask('w1', 't1', ['w1'])],
          w2: [
            genTask('w2', 't2', ['w1', 'w2']),
            genTask('w2', 't3', ['w1', 'w2']),
            genTask('w2', 't4', ['w2']),
            genTask('w2', 't5', ['w2']),
          ],
          w3: [
            genTask('w3', 't6', ['w1', 'w2', 'w3']),
            genTask('w3', 't7', ['w1', 'w2', 'w3']),
            genTask('w3', 't8', ['w1', 'w2', 'w3']),
            genTask('w3', 't9', ['w1', 'w2', 'w3']),
            genTask('w3', 't10', ['w1', 'w2', 'w3']),
          ],
        },
      },
      after: {
        result: {
          w1: [
            genTask('w1', 't1', ['w1']),
            genTask('w3', 't6', ['w1', 'w2', 'w3']),
            genTask('w3', 't7', ['w1', 'w2', 'w3']),
          ],
          w2: [
            genTask('w2', 't2', ['w1', 'w2']),
            genTask('w2', 't3', ['w1', 'w2']),
            genTask('w2', 't4', ['w2']),
            genTask('w2', 't5', ['w2']),
          ],
          w3: [
            genTask('w3', 't8', ['w1', 'w2', 'w3']),
            genTask('w3', 't9', ['w1', 'w2', 'w3']),
            genTask('w3', 't10', ['w1', 'w2', 'w3']),
          ],
        },
      },
      workersToBalance: 2,
    },
  ])('should balance the output', ({ before, after, workersToBalance }) => {
    expect(balance(before, workersToBalance)).toEqual(after);
  });
});
