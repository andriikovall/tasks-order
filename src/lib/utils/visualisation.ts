import { Output, Task } from '../../types';

export const visualize = (output: Output): string => {
  const tasksRows = Object.values(output.result);
  const result = tasksRows.map(visualizeRow).join('\n');
  return result;
};

const visualizeRow = (tasks: Task[]): string => {
  return tasks.map(visualizeTask).join('--');
};

const visualizeTask = (task: Task): string => {
  return `${`🏢`.repeat(task.duration)}${task.id}`;
};
