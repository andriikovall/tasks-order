import { IdleTask, ResultTask, Task } from '../../types';

export const isIdleTask = (task: ResultTask): task is IdleTask => {
  return (task as Task)?.name === undefined;
};

export const isRegularTask = (task: ResultTask): task is Task => {
  return !isIdleTask(task);
}