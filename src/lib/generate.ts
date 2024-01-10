import minimist from 'minimist';
import { generateInput } from "../generators/generateInput"
import fs from 'fs';
import path from 'path';

const argv = minimist(process.argv.slice(2));

const workersCount = argv.w ?? 3
const tasksCount = argv.t ?? 4
const generatedDataPath = argv.o ?? path.join(__dirname, '../assets/generated.json')

const generatedInput = generateInput(workersCount, tasksCount)

const generatedDataRaw = fs.existsSync(generatedDataPath) ? fs.readFileSync(generatedDataPath, 'utf-8') : '[]'
const generatedArray = JSON.parse(generatedDataRaw || '[]').concat(generatedInput)
const updatedDataRaw = JSON.stringify(generatedArray, null, 2)
fs.writeFileSync(generatedDataPath, updatedDataRaw)


export { }