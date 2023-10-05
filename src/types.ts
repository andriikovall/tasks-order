export type Task = {
  id: string;
  name: string;
  /**
   * Any relative number, e.g. 1, 2, 3, 4, 5, 10, 100, 1000.
   * Can be treated as a relative number of hours, days, whatever
   */
  duration: number;
  /**
   * Tasks that must be done before this task
   */
  dependsOn: string[];
  dependents: string[];
  /**
   * Workers who can do this task
   */
  canBeDoneBy: string[];
  priority: number;
};

/**
 * It's not always possible
 * to make all workers busy, so some of them
 * can be idle during some periods of time
 */
export type IdleTask = Pick<Task, 'duration' | 'id'>;
export type ResultTask = Task | IdleTask;

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
  result: Record<Worker['id'], ResultTask[]>;
};

export const PRIORITIES = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
} as const;

export type Worker = {
  id: string;
  name: string;
};
