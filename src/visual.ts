import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import { visualize } from './lib/utils/visualisation';
import { OutputWithMeta } from './types';

const argv = minimist(process.argv.slice(2));

const inputFile = argv.i ?? path.join(__dirname, './assets/generated.json');

const data: OutputWithMeta[] = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
const ui = data.map(v => ({ string: visualize(v), ...v }));

for (const u of ui) {
  console.log(
    '-------------------',
    u.method,
    u.balanced ? 'balanced' : '',
    '-------------------',
  );
  console.log(u.string);
  console.log('----------------------------------------------------');
}
