import { Output, ResultTask } from '../../types';
import { isIdleTask, isRegularTask } from './type';

export const visualize = (output: Output): string => {
  const tasksRows = Object.values(output.result);
  const result = tasksRows.map(visualizeRow).join('\n');
  return result;
};

const visualizeRow = (tasks: ResultTask[]): string => {
  return tasks.map(visualizeTask).join('--');
};

const visualizeTask = (task: ResultTask): string => {
  const dependsOnSuffix = isRegularTask(task)
    ? `(${task.dependsOn.join(',')})`
    : '';
  return `${`🏢`.repeat(task.duration)}${task.id}${dependsOnSuffix}`;
};
