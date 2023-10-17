import { Task, Worker } from '../../types';
import {
  TransportationProblemInput,
  TransportationProblemOutput,
} from './types';

export const vogelsApproximation = (
  input: TransportationProblemInput<Worker, Task>,
): TransportationProblemOutput<Worker, Task> => {
  const grid = input.costs;
  const supply = input.suppliers.map(supplier => supplier.supply);
  const demand = input.demands.map(demand => demand.demand);

  const res = vogelsApproximation2(grid, supply, demand);
  return {
    allocations: res.map(allocation => ({
      supplier: input.suppliers[allocation.supplierIndex],
      destination: input.demands[allocation.destinationIndex],
      allocatedAmount: allocation.value,
    })),
  };
};

type Grid = number[][];
type Supply = number[];
type Demand = number[];

type Allocation = {
  supplierIndex: number;
  destinationIndex: number;
  value: number;
};

const INF = Number.MAX_SAFE_INTEGER;

const vogelsApproximation2 = (
  grid: Grid,
  supply: Supply,
  demand: Demand,
): Allocation[] => {
  const n = grid.length;
  const allocations: Allocation[] = [];

  function findDiff(grid: Grid): [number[], number[]] {
    const rowDiff: number[] = [];
    const colDiff: number[] = [];

    for (let i = 0; i < grid.length; i++) {
      const arr = [...grid[i]];
      arr.sort((a, b) => a - b);
      rowDiff.push(arr[1] - arr[0]);
    }

    for (let col = 0; col < grid[0].length; col++) {
      const arr: number[] = [];
      for (let i = 0; i < grid.length; i++) {
        arr.push(grid[i][col]);
      }
      arr.sort((a, b) => a - b);
      colDiff.push(arr[1] - arr[0]);
    }

    return [rowDiff, colDiff];
  }

  while (Math.max(...demand) !== 0) {
    console.log('demand:', demand, supply);
    const [row, col] = findDiff(grid);
    const maxi1 = Math.max(...row);
    const maxi2 = Math.max(...col);

    if (maxi1 >= maxi2) {
      const ind = row.findIndex(val => val === maxi1);
      const mini1 = Math.min(...grid[ind]);
      const ind2 = grid[ind].findIndex(val => val === mini1);
      const mini2 = Math.min(supply[ind], demand[ind2]);

      allocations.push({
        supplierIndex: ind,
        destinationIndex: ind2,
        value: mini1,
      });
      supply[ind] -= mini2;
      demand[ind2] -= mini2;

      if (demand[ind2] === 0) {
        for (let r = 0; r < n; r++) {
          grid[r][ind2] = INF;
        }
      } else {
        grid[ind].fill(INF);
      }
    } else {
      const ind = col.findIndex(val => val === maxi2);
      let mini1 = INF;

      for (let j = 0; j < n; j++) {
        mini1 = Math.min(mini1, grid[j][ind]);
      }

      const ind2 = grid.findIndex(row => row[ind] === mini1);
      if (ind2 !== -1) {
        const mini2 = Math.min(supply[ind2], demand[ind]);

        allocations.push({
          supplierIndex: ind2,
          destinationIndex: ind,
          value: mini1,
        });
        supply[ind2] -= mini2;
        demand[ind] -= mini2;

        if (demand[ind] === 0) {
          for (let r = 0; r < n; r++) {
            grid[r][ind] = INF;
          }
        } else {
          grid[ind2].fill(INF);
        }
      }
    }
  }

  return allocations;
};
