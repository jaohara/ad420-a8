// an interface for a logged runtime duration
interface TimeRecord {
  duration: number;
  name: string;
  logTime: number;
}

// The array of recorded runtimes
export const times: TimeRecord[] = [];

// Adds a named duration directly to the array of TimeRecords
export const addTimeRecord = (name: string, duration: number) => 
  times.push({name, duration, logTime: process.uptime()});

// calls a function and returns an object with the function's return value and the runtime
export const callAndGetRuntime = (operation: Function) => {
  const startTime = process.uptime();
  const result = operation();
  return {
    result: result,
    runtime: process.uptime() - startTime,
  };
};

// calls a function and records runtime in the TimeRecord array under a given name
export const callAndRecordTime = (operation: Function, name: string) => {
  const startTime = process.uptime();
  operation();
  addTimeRecord(name, process.uptime() - startTime);
};

// Not sure how accurate this is - I wasn't sure how I'd split up timing the individual actions for
// things like "average time to find the word 'imperdiet' per line", so I figured the simplest way
// would be to just divide the total duration of the search by how many items were found.
export const callAndRecordAverageTimePerResultItem = (operation: Function, name: string) => {
  const { result, runtime } = callAndGetRuntime(operation);
  addTimeRecord(name, result.length > 0 ? runtime / result.length : runtime);
  return result;
};

export const getFirstTimeRecordByNameIfExists = (name: string) => {
  const recordMatches = times.filter((record) => record.name.toLowerCase() === name.toLowerCase());
  return recordMatches !== null && recordMatches.length > 0 ? recordMatches[0] : null;
};