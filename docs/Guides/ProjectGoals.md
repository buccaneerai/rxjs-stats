## Package Goals & Features

**Expressive & Declarative**.  Users should be able to run common mathematical, statistical and data munging calculations using conventional RxJS operator syntax. This project embraces RxJS!

**Isomorphic**. Code should be written in universal JavaScript.

**Accessible and well documentated**: The project should be welcoming to new contributors and users.  This means providing great documentation and onboarding for contributors!

**Opinionated**.  The goal is to build a great package for the majority of users.  Sometimes that means saying no to ideas that make the package better for some niche of users but worse for the ecosystem as a whole.  Contributors and project maintainers should be honest about which features are not likely to be included in the core package.  For these types of things, we recommend users create their own operators that can be appended by those who want them.

**Fully reactive online algorithms**. Instead of running mathematical calculations on large matrices which hog memory and compute power, `rxjs-stats` allows calculations to be run incrementally on streams \(something mathematicians "online algorithms"\) which cache only the minimum amount of information necessary to calculate the desired result.  The result is updated as more data is streamed into the pipeline.  This allows for performant, real-time calculations.

**Reliable & Maintained**.  This package should be well tested and completely reliable for production use cases, including enterprises and startups who rely on it for critical applications. It should be maintained by independent opensource contributors as well as the core [Swashbuckler](https://swashbuckler.ai) team and organizational sponsors.

**Minimal footprint & simple codebase**.  Most operators in this package are written as simple functions that contain under 20 lines of code.  This keeps the package size lean. It makes the codebase easy to understand. It makes the codebase easy for new users to jump into without needing to understand a lot of unusual tools or abstractions.

**Asynchronous**.  Since `rxjs-stats` uses rxjs, it is agnostic to whether observables are fed by asynchronous sources or local memory.

**Secure**.  `rxjs-stats` has only a few npm dependencies which greatly reduces the attack surface.  It also uses a CD system that includes package security checks prior to any release.