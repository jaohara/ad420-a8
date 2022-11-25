import log4js from 'log4js';
import * as fs from 'fs';
import { argv } from './args.js';

// log config stuff
const logFileName = "consoleapp.log";

// get logLevel from verbosity arg
const logLevel = [
  "fatal",
  "error",
  "info",
  "debug",
  "trace",
][Math.min(4, argv.v)];

// configure logging
log4js.configure({
  appenders: {
    app: { type: 'file', filename: logFileName },
  },
  categories: {
    default: {
      appenders: ['app'],
      level: logLevel,
    }
  }
});

const logger = log4js.getLogger("a8");

// create exported object with shorthand mappings to logger functions
export const log = {
  f: (message:string) => logger.fatal(message),
  e: (message:string) => logger.error(message),
  i: (message:string) => logger.info(message),
  d: (message:string) => logger.debug(message),
  t: (message:string) => logger.trace(message),
};