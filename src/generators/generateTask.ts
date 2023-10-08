import { faker } from '@faker-js/faker';
import { Task } from '../types';

export const generateTask = (canBeDoneBy: Task['canBeDoneBy']): Task => ({
  canBeDoneBy,
  duration: faker.number.int({ min: 1, max: 10 }),
  id: faker.string.uuid(),
  name: faker.lorem.sentence({
    min: 1,
    max: 5,
  }),
  priority: faker.number.int({ min: 1, max: 10 }),
  // todo: remove
  dependents: [],
  dependsOn: [],
});
