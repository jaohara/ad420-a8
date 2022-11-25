import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Configuration for command-line arguments

export const argv = yargs(hideBin(process.argv))
  .alias("f", "file")
  .alias("h", "help")
  .alias("r", "read")
  .alias("w", "write")
  .boolean(['r', 'w'])
  .conflicts("r", "w")
  .demandOption("f", "Please provide a filename argument to use this program.")
  .describe("r", "Open the target file in read-mode.")
  .describe("w", "Open the target file in write-mode.")
  .describe("f", "Specify name of file to work on.")
  .help()
  .hide("version")
  .usage("$0 [-r|-w] -f filename")
  .string("f")
  .parseSync();