import { Task, Worker } from '../../../types';
import {
  TransportationProblemInput,
  TransportationProblemOutput,
} from '../types';
import { vogelsApproximation } from '../vogelsApproximation';

describe('vogelsApproximation', () => {
  it.each<{
    input: TransportationProblemInput;
    output: TransportationProblemOutput;
  }>([
    {
      input: {
        costs: [
          [2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 5],
          [
            Number.MAX_SAFE_INTEGER,
            3,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
          [Number.MAX_SAFE_INTEGER, 3, 4, Number.MAX_SAFE_INTEGER],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 2 },
          { id: '2', name: 'Task 2', demand: 3 },
          { id: '3', name: 'Task 3', demand: 4 },
          { id: '4', name: 'Task 4', demand: 5 },
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
        ],
      },
      output: {
        allocations: [
          {
            allocatedAmount: 2,
            destination: expect.objectContaining({
              id: '1',
              name: 'Task 1',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 3,
            destination: expect.objectContaining({
              id: '2',
              name: 'Task 2',
            }),
            supplier: expect.objectContaining({
              id: '2',
              name: 'Worker 2',
            }),
          },
          {
            allocatedAmount: 4,
            destination: expect.objectContaining({
              id: '3',
              name: 'Task 3',
            }),
            supplier: expect.objectContaining({
              id: '3',
              name: 'Worker 3',
            }),
          },
          {
            allocatedAmount: 5,
            destination: expect.objectContaining({
              id: '4',
              name: 'Task 4',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
        ],
      },
    },
    {
      input: {
        costs: [
          [2, 3, 4, 5],
          [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
          [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 2 },
          { id: '2', name: 'Task 2', demand: 3 },
          { id: '3', name: 'Task 3', demand: 4 },
          { id: '4', name: 'Task 4', demand: 5 },
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
        ],
      },
      output: {
        allocations: [
          {
            allocatedAmount: 2,
            destination: expect.objectContaining({
              id: '1',
              name: 'Task 1',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 3,
            destination: expect.objectContaining({
              id: '2',
              name: 'Task 2',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 4,
            destination: expect.objectContaining({
              id: '3',
              name: 'Task 3',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 5,
            destination: expect.objectContaining({
              id: '4',
              name: 'Task 4',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
        ],
      },
    },
    {
      input: {
        costs: [
          [
            2,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
          [
            Number.MAX_SAFE_INTEGER,
            3,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
          [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            4,
            Number.MAX_SAFE_INTEGER,
          ],
          [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            5,
          ],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 2 },
          { id: '2', name: 'Task 2', demand: 3 },
          { id: '3', name: 'Task 3', demand: 4 },
          { id: '4', name: 'Task 4', demand: 5 },
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
          { id: '4', name: 'Worker 4', supply: Number.MAX_SAFE_INTEGER },
        ],
      },
      output: {
        allocations: [
          {
            allocatedAmount: 2,
            destination: expect.objectContaining({
              id: '1',
              name: 'Task 1',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 3,
            destination: expect.objectContaining({
              id: '2',
              name: 'Task 2',
            }),
            supplier: expect.objectContaining({
              id: '2',
              name: 'Worker 2',
            }),
          },
          {
            allocatedAmount: 4,
            destination: expect.objectContaining({
              id: '3',
              name: 'Task 3',
            }),
            supplier: expect.objectContaining({
              id: '3',
              name: 'Worker 3',
            }),
          },
          {
            allocatedAmount: 5,
            destination: expect.objectContaining({
              id: '4',
              name: 'Task 4',
            }),
            supplier: expect.objectContaining({
              id: '4',
              name: 'Worker 4',
            }),
          },
        ],
      },
    },
    {
      input: {
        costs: [
          [2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 5],
          [
            Number.MAX_SAFE_INTEGER,
            3,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
          ],
          [2, 3, 4, 5],
          [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 4, 5],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 2 },
          { id: '2', name: 'Task 2', demand: 3 },
          { id: '3', name: 'Task 3', demand: 4 },
          { id: '4', name: 'Task 4', demand: 5 },
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
          { id: '4', name: 'Worker 4', supply: Number.MAX_SAFE_INTEGER },
        ],
      },
      output: {
        allocations: [
          {
            allocatedAmount: 3,
            destination: expect.objectContaining({
              id: '2',
              name: 'Task 2',
            }),
            supplier: expect.objectContaining({
              id: '2',
              name: 'Worker 2',
            }),
          },
          {
            allocatedAmount: 2,
            destination: expect.objectContaining({
              id: '1',
              name: 'Task 1',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 5,
            destination: expect.objectContaining({
              id: '4',
              name: 'Task 4',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 4,
            destination: expect.objectContaining({
              id: '3',
              name: 'Task 3',
            }),
            supplier: expect.objectContaining({
              id: '3',
              name: 'Worker 3',
            }),
          },
        ],
      },
    },
    {
      input: {
        costs: [
          [2, 3, 4, 5],
          [2, 3, Number.MAX_SAFE_INTEGER, 5],
          [Number.MAX_SAFE_INTEGER, 3, 4, 5],
          [2, Number.MAX_SAFE_INTEGER, 4, Number.MAX_SAFE_INTEGER],
        ],
        demands: [
          { id: '1', name: 'Task 1', demand: 2 },
          { id: '2', name: 'Task 2', demand: 3 },
          { id: '3', name: 'Task 3', demand: 4 },
          { id: '4', name: 'Task 4', demand: 5 },
        ],
        suppliers: [
          { id: '1', name: 'Worker 1', supply: Number.MAX_SAFE_INTEGER },
          { id: '2', name: 'Worker 2', supply: Number.MAX_SAFE_INTEGER },
          { id: '3', name: 'Worker 3', supply: Number.MAX_SAFE_INTEGER },
          { id: '4', name: 'Worker 4', supply: Number.MAX_SAFE_INTEGER },
        ],
      },
      output: {
        allocations: [
          {
            allocatedAmount: 2,
            destination: expect.objectContaining({
              id: '1',
              name: 'Task 1',
            }),
            supplier: expect.objectContaining({
              id: '4',
              name: 'Worker 4',
            }),
          },
          {
            allocatedAmount: 4,
            destination: expect.objectContaining({
              id: '3',
              name: 'Task 3',
            }),
            supplier: expect.objectContaining({
              id: '4',
              name: 'Worker 4',
            }),
          },
          {
            allocatedAmount: 3,
            destination: expect.objectContaining({
              id: '2',
              name: 'Task 2',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
          {
            allocatedAmount: 5,
            destination: expect.objectContaining({
              id: '4',
              name: 'Task 4',
            }),
            supplier: expect.objectContaining({
              id: '1',
              name: 'Worker 1',
            }),
          },
        ],
      },
    },
  ])('should return correct output', ({ input, output }) => {
    expect(
      vogelsApproximation(input as TransportationProblemInput<Worker, Task>),
    ).toEqual(output);
  });
});
