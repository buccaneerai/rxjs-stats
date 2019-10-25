# Purpose
Why does this package exist? The engineering team at [Buccaneer](https://www.buccaneer.ai) wanted a set of of RxJS 6 operators to perform common calculations used in statistics, data science, math, analytics and machine learning. 
These tools did not exist so they built them from scratch. rxjs-stats was born and released as an opensource package so the entire Javascript community could use it, improve upon it and build cool stuff!

💡rxjs-stats is part of a larger effort to build top-notch data science tools for JavaScript. If you'd like to help make this happen, contributors and sponsors will be welcomed with open arms!

# Features
- **Expressive & Declarative**.  Run common mathematical, statistical and data munging calculations using conventional RxJS operator syntax.
- **Isomorphic**. It's written in universal JavaScript.
- **Fully reactive online algorithms**. Instead of running mathematical calculations on large matrices which hog memory and compute power, `rxjs-stats` allows calculations to be run incrementally on streams (something mathematicians "online algorithms") which cache only the minimum amount of information necessary to calculate the desired result.  The result is updated as more data is streamed into the pipeline.  This allows for performant, real-time calculations.
- **Reliable & Maintained**.  This package is well tested and used in production for enterprise use cases. It is maintained by independent opensource contributors as well as professional sponsors.
- **Minimal footprint**.  Most operators are written as simple functions that contain under 20 lines of code.  This keeps the package size lean and the codebase easy to understand.
- **Asynchronous**.  Since `rxjs-stats` uses rxjs, it is agnostic to whether observables are fed by asynchronous sources or local memory.
- **Secure**.  `rxjs-stats` has only a few npm dependencies which greatly reduces the attack surface.  It also uses a CD system that includes package security checks prior to any release.