import { Task, Worker } from '../../types';
import {
  TransportationProblemInput,
  TransportationProblemOutput,
} from './types';

export const vogelsApproximation = (
  input: TransportationProblemInput,
): TransportationProblemOutput<Worker, Task> => {
    const grid = input.costs;
    const supply = input.suppliers.map(supplier => supplier.supply ? 100 : supplier.supply);
    const demand = input.demands.map(demand => demand.demand > 1000 ? 1000 : demand.demand);
    console.log('grid, supply, demand:', {grid, supply, demand});
//   const grid = [
//       [3, 1, 7, 4],
//       [2, 6, 5, 9],
//       [8, 3, 3, 2],
//     ],
//     supply = [300, 400, 500],
//     demand = [250, 350, 400, 200];

  const res = vogelsApproximation2(grid, supply, demand);
  console.log('res:', res);
  return {} as TransportationProblemOutput<Worker, Task>;
};

type Grid = number[][];
type Supply = number[];
type Demand = number[];

const INF = Number.MAX_SAFE_INTEGER;

// todo: this works, we have to stick to it somehow
const vogelsApproximation2 = (
  grid: Grid,
  supply: Supply,
  demand: Demand,
): number => {
  let n = grid.length;
  let ans = 0;

  function findDiff(grid: Grid): [number[], number[]] {
    let rowDiff: number[] = [];
    let colDiff: number[] = [];

    for (let i = 0; i < grid.length; i++) {
      let arr = [...grid[i]];
      arr.sort((a, b) => a - b);
      rowDiff.push(arr[1] - arr[0]);
    }

    for (let col = 0; col < grid[0].length; col++) {
      let arr: number[] = [];
      for (let i = 0; i < grid.length; i++) {
        arr.push(grid[i][col]);
      }
      arr.sort((a, b) => a - b);
      colDiff.push(arr[1] - arr[0]);
    }

    // console.log('rowDiff, colDiff:', rowDiff, colDiff);
    return [rowDiff, colDiff];
  }

  while (Math.max(...supply) !== 0 || Math.max(...demand) !== 0) {
    let [row, col] = findDiff(grid);
    let maxi1 = Math.max(...row);
    let maxi2 = Math.max(...col);

    if (maxi1 >= maxi2) {
      let ind = row.findIndex(val => val === maxi1);
      let mini1 = Math.min(...grid[ind]);
      let ind2 = grid[ind].findIndex(val => val === mini1);
      let mini2 = Math.min(supply[ind], demand[ind2]);

      ans += mini2 * mini1;
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
      let ind = col.findIndex(val => val === maxi2);
      let mini1 = INF;

      for (let j = 0; j < n; j++) {
        mini1 = Math.min(mini1, grid[j][ind]);
      }

      let ind2 = grid.findIndex(row => row[ind] === mini1);
      if (ind2 !== -1) {
        let mini2 = Math.min(supply[ind2], demand[ind]);

        ans += mini2 * mini1;
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

  return ans;
};
