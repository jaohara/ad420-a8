import * as fs from 'fs';

import { argv } from './args.js';
import { readInput } from './input.js';
import { printErrorAndExit, printStatus, printValue } from './output.js';
import { addTimeRecord, callAndRecordAverageTimePerResultItem, times } from './timer.js';

const filemode = argv.w ? "w" : "r";
const filename = argv.f;
const matchPattern = /[I|i]mperdiet/g;
const matchString = "imperdiet";

console.log("Assignment 8 - John O'Hara" + "\n");

// check if file exists, blow up if it doesn't
if (filemode === "r" && !fs.existsSync(filename)) {
  printErrorAndExit(`File "${filename}" does not exist.`);
}

printStatus(`Opening '${filename}' in ${filemode === "w" ? "write" : "read"} mode`);

// read lines from file in read mode or initialize to an empty string[] in write mode 
const fileLines = (() => {
  if (filemode === "r") {
    return callAndRecordAverageTimePerResultItem(
      () => fs.readFileSync(filename, 'utf8').split("\n"),
      "averageLineReadTime"
    );
  }

  return [];
})() as string[];

// gather input in write mode
if (filemode === "w") {
  fileLines.push(...readInput())
  fs.writeFileSync(filename, fileLines.join("\n"));
}

// calculate results
const linesWithWord = callAndRecordAverageTimePerResultItem(
  () => fileLines.filter(line => line.toLowerCase().match(matchPattern)),
  "averageLineMatchTime"
);

const wordCount = [...linesWithWord.join("").matchAll(new RegExp(matchPattern))].length;

// output results
printStatus(`Searching for the word '${matchString}'`);
printValue(`Lines with '${matchString}'`, linesWithWord.length);
printValue(`'${matchString}' Occurrences`, wordCount);

// record time before exit
addTimeRecord("totalExecution", process.uptime());

// record times
times.forEach(time => {
  console.log(time);
});