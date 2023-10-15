export type Worker = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  name: string;
  /**
   * Any relative number, e.g. 1, 2, 3, 4, 5, 10, 100, 1000.
   * Can be treated as a relative number of hours, days, whatever
   */
  duration: number;
  /**
   * Workers who can do this task
   */
  canBeDoneBy: string[];
  priority: number;
};

export type BaseItemMeta = Pick<Worker, 'id' | 'name'>;

export type Input = {
  workers: Worker[];
  tasks: Task[];
};

export type Output = {
  /**
   * The list of tasks that each worker must do with a minimal possible duration
   *
   * Each task will surely we completed and the time will be minimal
   */
  result: Record<Worker['id'], Task[]>;
};

export const PRIORITIES = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
} as const;
