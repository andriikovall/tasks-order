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
  it.each<{ before: Output; after: Output }>([
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
  ])('should balance the output', ({ before, after }) => {
    expect(balance(before)).toEqual(after);
  });
});
