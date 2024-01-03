import { Output, Task } from '../../types';

export const visualize = (output: Output): string => {
  const tasksRows = Object.values(output.result);
  const result = tasksRows.map(visualizeRow).join('\n');
  return result;
};

const visualizeRow = (tasks: Task[]): string => {
  const tasksString = tasks.map(visualizeTask).join('--')
  return `W -> ${tasksString}`;
};

const visualizeTask = (task: Task): string => {
  return `${`🏢`.repeat(task.duration)}`;
};
