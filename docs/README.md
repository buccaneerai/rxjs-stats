# Overview

## Purpose
`rxjs-stats` is the real-time statistics toolkit for [RxJS](https://rxjs-dev.firebaseapp.com).  It is part of [Swashbuckler](https://swashbuckler.ai) project which aims to create second-to-none tools for performing data science and machine learning in pure JavaScript.

`rxjs-stats` provides RxJS 6 operators which implement calculations commonly used in data science, statistics, analytics, machine learning and devops.  This allows for users to calculate statistics in a way that is reactive, declarative, performant and reliable. It makes it very simple to compute statistics from `Observable` streams.

If you are a (current or aspiring) data scientist or machine learning engineer who loves JavaScript, then please consider joining the Swashbuckler community, becoming a contributor, supporting the projects on GitHub or encouraging your organization to sponsor!

## Features

* **Expressive & Declarative**.  Run common mathematical, statistical and data munging calculations using conventional RxJS operator syntax.
* **Isomorphic**. It's written in universal JavaScript.
* **Fully reactive online algorithms**. Instead of running mathematical calculations on large matrices which hog memory and compute power, `rxjs-stats` allows calculations to be run incrementally on streams \(something mathematicians "online algorithms"\) which cache only the minimum amount of information necessary to calculate the desired result.  The result is updated as more data is streamed into the pipeline.  This allows for performant, real-time calculations.
* **Reliable & Maintained**.  This package is well tested and used in production for enterprise use cases. It is maintained by independent opensource contributors as well as professional sponsors.
* **Minimal footprint**.  Most operators are written as simple functions that contain under 20 lines of code.  This keeps the package size lean and the codebase easy to understand.
* **Asynchronous**.  Since `rxjs-stats` uses rxjs, it is agnostic to whether observables are fed by asynchronous sources or local memory.
* **Secure**.  `rxjs-stats` has only a few npm dependencies which greatly reduces the attack surface.  It also uses a CD system that includes package security checks prior to any release.
