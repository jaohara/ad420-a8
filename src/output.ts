import chalk from "chalk";

// Helper Functions for formatting output

export const printErrorAndExit = (message: string) => {
  console.log("\n" + chalk.red("Error:") + ` ${message}`);
  process.exit();
};

export const printStatus = (message: string) => 
  console.log(chalk.blue(`\n${message}...\n`));

export const printValue = (key: string, value: any) => 
  console.log(chalk.blue(`${key}:`) + ` ${value}`);