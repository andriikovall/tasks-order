import { faker } from '@faker-js/faker';
import { generateTask } from './generateTask';
import { generateWorker } from './generateWorker';

export const generateInput = (workersCount: number, tasksCount: number) => {
  const workers = Array.from({ length: workersCount }, () => generateWorker());
  const tasks = Array.from({ length: tasksCount }, () => {
    const numberOfWorkersForTask = faker.number.int({
      min: 1,
      max: workersCount,
    });
    const canBeDoneBy: string[] = [];
    const workersPoolForTask = [...workers];
    for (let i = 0; i < numberOfWorkersForTask; i++) {
      const randomWorkerIndex = faker.number.int({
        min: 0,
        max: workersPoolForTask.length - 1,
      });
      const workerId = workersPoolForTask[randomWorkerIndex].id;
      canBeDoneBy.push(workerId);
      workersPoolForTask.splice(randomWorkerIndex, 1);
    }
    return generateTask(canBeDoneBy);
  });

  return {
    workers,
    tasks,
  };
};
