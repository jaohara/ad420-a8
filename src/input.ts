import PromptSync from 'prompt-sync';
import { printStatus } from './output.js';

// Handles user input

const promptString = ": ";
const prompt = PromptSync();

export const readInput = () => {
  const inputLines = [];
  let readingInput = true;

  printStatus("Reading lines (press Ctrl + C to end)");

  while(readingInput) {
    const currentInput = prompt(promptString);
    if (currentInput === null) {
      readingInput = false;
    }
    inputLines.push(currentInput !== null ? currentInput : "\n");
  }
  
  return inputLines;
};