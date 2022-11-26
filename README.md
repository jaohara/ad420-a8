# Assignment 8
A TypeScript program for Assignment 8 in my AD420 class at North Seattle College. 

Given a text file of lorem ipsum, it will find a count of all lines that include the word "imperdiet" as well as the overall wordcount. Logs to `consoleapp.log` depending on specified log level.

Uses TypeScript, yargs for argument parsing, log4js for logging, and chalk for some formatting.

## Usage

```console
npm install
npm run build
./a8 [-r|-w] [-vvvv] [-s] -f filename
```

Or:

```console
npm install
npm run start -- [-r|-w] [-vvvv] [-s] -f filename
```

## Examples
Count occurences of "imperdiet" in the file "lipsum.txt" with the least verbose log level:

```console
./a8 -r -f ./lipsum.txt
```

Write to a file "myfile.txt" with trace-level logging and output of time stats:

```console
./a8 -w -vvvv -s -f ./myfile.txt
```

Show all available commandline parameters with usage explanations:

```console
./a8 -h
```