import arrify from 'arrify';
import fs from 'fs';
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
};
