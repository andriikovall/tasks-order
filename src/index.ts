/**
 * Input file
 * Output file
 * method name
 * time
 *
 */

import minimist from 'minimist';
import path from 'path';
import { MainArgs } from './types';
import { main } from './lib/main';

const argv = minimist(process.argv.slice(2));

const inputFile = argv.i ?? path.join(__dirname, './assets/generated.json');
const balanceVogels = argv.b ?? false;
const outputFile = argv.o ?? path.join(__dirname, `./assets/output.json`);
const visual = argv.v ?? false;

const mainArgs: MainArgs = {
  inputFilePath: inputFile,
  outputFilePath: outputFile,
  balanceVogels,
  visual,
};

main(mainArgs);
