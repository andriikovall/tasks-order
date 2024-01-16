import arrify from 'arrify';
import fs from 'fs';
import { visualize } from './utils/visualisation';
import { Input, MainArgs, Method } from '../types';
import { method } from './method';
import { balance } from './balance/balance';

export const main = (args: MainArgs) => {
  const { inputFilePath, outputFilePath, balanceVogels } = args;
  const input = arrify<Input[]>(
    JSON.parse(fs.readFileSync(inputFilePath, 'utf-8')),
  );
  const results = input
    .map(input => {
      try {
        return method(input);
      } catch (e) {
        console.error(e);
        return null;
      }
    })
    .filter(Boolean);

  if (balanceVogels) {
    results.forEach(res => {
      if (res?.method === Method.Vogels) {
        balance(res);
        res.balanced = true;
      }
    });
  }
  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
  if (args.visual) {
    results.forEach(res => {
      if (res) {
        console.log('=====================================');
        console.log(`Method: ${res.method} ${res.balanced ? 'balanced' : ''}`);
        console.log(visualize(res));
        console.log('=====================================');
      }
    });
  }
};
