import { handleCommand } from "./operations.js"

const args = process.argv.slice(2)

if (args.length < 1) {
  console.error('Request should follow the structure: node <fileName> <command> [options]')
}

const command = args[0]
const options = args.slice(1)

handleCommand(command, options)
