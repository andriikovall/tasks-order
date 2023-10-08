import { faker } from '@faker-js/faker';
import { Worker } from '../types';

export const generateWorker = (): Worker => ({
  id: faker.string.uuid(),
  name: faker.lorem.slug({
    min: 1,
    max: 5,
  }),
});
