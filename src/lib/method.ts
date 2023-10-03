import { Input, Output } from '../types';
import { brutForce } from './brutForce';

export const method = (input: Input): Output => {
  return brutForce(input);
};
