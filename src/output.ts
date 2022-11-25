import chalk from "chalk";
import { log } from "./logger.js";

// Helper Functions for formatting output

export const printErrorAndExit = (message: string) => {
  console.log("\n" + chalk.red("Error:") + ` ${message}`);
  log.f(message);
  process.exit();
};

export const printStatus = (message: string) => {
  console.log(chalk.blue(`${message}...\n`));
  log.i(message);
}

export const printValue = (key: string, value: any) => 
  console.log(chalk.blue(`${key}:`) + ` ${value}`);