import * as fs from 'fs';

import { argv } from './args.js';
import { readInput } from './input.js';
import { log } from './logger.js';
import { printErrorAndExit, printStatus, printValue } from './output.js';
import { addTimeRecord, callAndRecordAverageTimePerResultItem, times } from './timer.js';

const filemode = argv.w ? "w" : "r";
const filename = argv.f;
const matchPattern = /[I|i]mperdiet/g;
const matchString = "imperdiet";

// print title and log args
console.log("Assignment 8 - John O'Hara" + "\n");
log.i("Program initialized");
log.d(`Program arguments: ${JSON.stringify(argv)}`);

// check if file exists if in read mode, blow up if it doesn't
if (filemode === "r" && !fs.existsSync(filename)) {
  printErrorAndExit(`File "${filename}" does not exist.`);
}

printStatus(`Opening '${filename}' in ${filemode === "w" ? "write" : "read"} mode`);

// read lines from file in read mode or initialize to an empty string[] in write mode 
const fileLines = (() => {
  if (filemode === "r") {
    log.t(`Reading from '${filename}...'`);

    const result =  callAndRecordAverageTimePerResultItem(
      () => fs.readFileSync(filename, 'utf8').split("\n"),
      "averageLineReadTime"
    );

    log.i(`Read ${result && Array.isArray(result) && result.length} lines from ${filename}`);
    return result;
  }
  
  return [];
})() as string[];

// gather input in write mode
if (filemode === "w") {
  log.t("Beginning write operation");
  fileLines.push(...readInput());
  fs.writeFileSync(filename, fileLines.join("\n"));
  log.t("Completed write operation");
}

// calculate results
printStatus(`Searching for the word '${matchString}'`);

const linesWithWord = (() => {
  log.t(`Finding lines with word '${matchString}'`);
  
  const result = callAndRecordAverageTimePerResultItem(
    () => fileLines.filter(line => line.toLowerCase().match(matchPattern)),
    "averageLineMatchTime"
  );
  
  log.i(`Found ${result && Array.isArray(result) && result.length} lines with '${matchString}'`);
  return result;
})();

log.t(`Finding wordcount for ${matchString}`);
const wordCount = [...linesWithWord.join("").matchAll(new RegExp(matchPattern))].length;
log.i(`Found '${matchString}' ${wordCount} time${ wordCount === 1 ? "" : "s" } in '${filename}'`);

// output results
printValue(`Lines with '${matchString}'`, linesWithWord.length);
printValue(`'${matchString}' Occurrences`, wordCount);

// get totalExecution time and log all times
addTimeRecord("totalExecution", process.uptime());
log.i("Execution completed");
log.i("Execution Time Report: ");
times.forEach(record => log.i(`${record.name} - ${record.duration}s, completed at ${record.logTime}s`));