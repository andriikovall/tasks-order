import minimist from 'minimist';
import { generateInput } from "./generators/generateInput"
import fs from 'fs';
import path from 'path';

const argv = minimist(process.argv.slice(2));

const workersCount = argv.w ?? 3
const tasksCount = argv.t ?? 4

const generatedInput = generateInput(workersCount, tasksCount)

const generatedDatPath = path.join(__dirname, './assets/generated.json')
const generatedDataRaw = fs.readFileSync(generatedDatPath, 'utf-8')
const generatedArray = JSON.parse(generatedDataRaw).concat(generatedInput)
const updatedDataRaw = JSON.stringify(generatedArray, null, 2)
fs.writeFileSync(generatedDatPath, updatedDataRaw)


export { }