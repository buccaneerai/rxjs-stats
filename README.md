## Purpose

Why does this package exist? The engineering team at [Buccaneer](https://www.buccaneer.ai) wanted a set of of [RxJS 6](https://rxjs-dev.firebaseapp.com) operators to perform common calculations used in statistics, data science, math, analytics and machine learning.  These tools did not exist so they built them from scratch. `rxjs-stats` was born and released as an opensource package so the entire Javascript community could use it, improve upon it and build cool stuff!

:bulb: `rxjs-stats` is part of a larger effort to build top-notch data science tools for JavaScript. If you'd like to help make this happen, [contributors](#Contributing) and [sponsors](#Sponsors) will be welcomed with open arms!

## Features
- **Expressive**.  Run common mathematical, statistical and data munging calculations using conventional RxJS operator syntax.
- **Isomorphic**. It's written in universal JavaScript.
- **Fully reactive**. (Instead of running mathematical calculations on large matrices which suck up lots of memory and compute power, `rxjs-stats` allows calculations to be run on streams which cache only the minimum amount of information necessary to calculate the desired result.  The result is updated as more data is streamed into the pipeline.)
- **Reliable & Maintained**.  This package is well tested and used in production for enterprise use cases. It is maintained by independent opensource contributors as well as professional sponsors.
- **Minimal footprint**.  Most operators are written with under 20 lines of code, which keeps the package size tiny and the codebase easy to understand.
- **Horizontally scalable**: Much like mapreduce frameworks, `rxjs-stats` can merge multiple streams of numerical data into a single result.  For example, you could create 10 data streams to pull data from remote sources and combine them to calculate the mean of the entire dataset as a whole.  (Assuming that order doesn't matter, the RxJS `merge` operator can be used. There are more sophisticated options, too, which may be added in future releases.)
- **Asynchronous**.  Since rxjs-stats uses rxjs, it is agnostic to whether observables are fed by asynchronous sources or local memory.
- **Secure**.  `rxjs-stats` has only a few npm dependencies which greatly reduces the attack surface.  It also uses a CD system that includes package security checks prior to any release.

## Documentation
[](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats)

Compatability
|Platform|Support|
|--------------|:-----------:|
|node.js|:white_check_mark:  (>10.0)|
|browser|:white_check_mark:|
|React Native|:white_check_mark:|
|Electron|:white_check_mark:|

## Installation
```
npm i rxjs-stats --save
# or
yarn add rxjs-stats
```

## Getting started
Operators from `rxjs-stats` can generally be used like this:
```
import { from } from 'rxjs';
import { mean, standardDeviation, f1, accuracy } from 'rxjs-stats/operators';

// ingest a stream of numbers and calculate the mean in real-time
const mean$ = from([1, 2, 3, 4]).pipe(mean());
mean$.subscribe(console.log, null, () => console.log('done!'));
// 1
// 1.5
// 2
// 2.5
// done!
```

## List of operators
- [absoluteValue](#absoluteValue)
- [accuracy](#accuracy)
- [correlate](#correlate) (like pandas)
- [countValues](#countValues) (like pandas)
- [describe](#describe) (like pandas)
- [dirtyMedian](#dirtyMedian)<sup>**</sup>
- [dirtyMode](#dirtyMode)<sup>**</sup>
- [dirtyQuartiles](#dirtyQuartile)<sup>**</sup>
- [euclideanDistance](#euclideanDistance)
- [f1](#f1)
- [fillNullValues](#fillNullValues)
- [giniGain](#giniGain)
- [index](#index)
- [info](#info) (like pandas)
- [isNumber](#isNumber)
- [max](#max)
- [min](#min)
- [mean](#mean)
- [mse](#mse)
- [precision](#precision)
- [recall](#recall)
- [roundTo](#roundTo)
- [R](#R)
- [rSquared](#R)
- [stdev](#stdev)
- [sum](#sum)
- [throwIfNotNumber](#throwIfNotNumber)

** Some statistical and mathematical operators cannot be calculated reactively with complete correctness.  `rxjs-stats`prefaces these operators with the word `dirty`.  For use cases where the dataset is random, order doesn't matter and there are a sizable number of examples, the dirty calculation will typically converge to the same result as the pure version.

## Operators

### accuracy
```
```

### countValues
```
```

## Contributing
Want to help build top-notch data science tools for JavaScript?  for beginer

## Sponsors
If you're part of an enterprise that uses this software, please consider sponsoring the project on [Patreon]().  Any money contributed is used to pay for long-term maintanence, project infrastructure, engineering hours, bug fixes, new features and other improvements that benefit users of the package.

