import minimist from 'minimist';
import { generateInput } from "./generators/generateInput"
import { method } from "./lib/method"

const argv = minimist(process.argv.slice(2));

const workersCount = argv.w ?? 3
const tasksCount = argv.j ?? 10

const generatedInput = generateInput(workersCount, tasksCount)
const result = method(generatedInput)
console.log(result)

export { }