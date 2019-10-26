# How to create new operators

`rxjs-stats` exposes custom rxjs operators that follow a simple pattern:

## 1. Create a custom operator
Most operators in `rxjs-stats` are simple to understand if you have some basic working knowledge of RxJS.  Here is an example of the original `mean` (arithmatic average) operator (in version 0.4.0):
```js 
// src/operators/mean.js

import { map, scan } from 'rxjs/operators';

const reducer = function reducer([, sum, index], nextNum) {
  return [
    (sum + nextNum) / (index + 1),
    sum + nextNum,
    index + 1,
  ];
};

const mean = function mean() {
  return source$ => source$.pipe(
    scan(reducer, [null, 0, 0]), // run a reduce loop to cache the mean and its input values
    map(([average]) => average) // pull out the average
  );
};

export default mean;
```

Like most operators in RxJS stats, the `mean` operator is just a simple reduce loop that uses the [scan](https://rxjs-dev.firebaseapp.com/api/operators/scan) operator from RxJS.

You'll notice that it returns a function.  That's because RxJS expects [custom pipeable operators](https://rxjs-dev.firebaseapp.com/guide/operators) to be structured as a function that returns a function.  The inner function accepts a `source$` observable and returns a new observable.  (If you like, you can learn more about that [here](https://medium.com/javascript-everyday/rxjs-custom-operators-f8b9aeab9631)).

## 2. Test it
All operators in `rxjs-stats` should be accompanied by at least one corresponding unit test.  Unit tests should check that operators are conforming to their expected contract with external software.

Unit tests in `rxjs-stats` use the [marble testing syntax](https://rxjs-dev.firebaseapp.com/guide/testing/marble-testing) included in RxJS (starting in version 6).  To simplify syntax a bit, tests in `rxjs-stats` typically use [rxjs-marbles](https://github.com/cartant/rxjs-marbles). (But it's more what you call guideline than actual rules.)  Here's an example:

```js 
// src/operators/mean.test.js
import { expect } from 'chai';
import { from } from 'rxjs';
import { marbles } from 'rxjs-marbles/mocha';

import mean from './mean';

describe('mean', () => {
  it('should return the correct mean when given an observable of numbers', marbles(m => {
    const num$ = m.cold('a--bc-d--e|', {a: 1, b: 2, c: 3, d: 4, e: 5});
    const actual$ = num$.pipe(mean());
    const expected$ = m.cold('a--bc-d--e|', {a: 1, b: 1.5, c: 2, d: 2.5, e: 3});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
```
:bulb: If you aren't familiar with marble testing syntax, then the example above probably doesn't make any sense to you.  Luckily, RxJS has some [good documentation which explains it](https://rxjs-dev.firebaseapp.com/guide/testing/marble-testing) better than we could!.

## 3. Document it
It's important for public APIs to be well documented.  To keep things simple, we use [Gitbook](https://www.gitbook.com) for documentation.  This allows us to update existing documentation simply by editing Markdown files in the `./docs` folder of the repository.  Gitbook watches for branches that fit the patterns of `master` and `v*`.  Then it automatically versions and updates the documentation.

For the `mean` operator you can see its markdown file in `docs/operators/mean.md`.  Every public operator should have a corresponding markdown file.  At a minimum, the file should include a brief description of the operator and a practical code example that demonstrates its usage.

To add or remove new documentation pages from the table of contents, you can edit the `docs/SUMMARY.md` file. (Gitbook uses this file to determine how to organize the pages.)

## 4. Add it to the public API
Adding a new operator involves adding it to the index file at `./src/operators/index.js`.  The corresponding unit test should also be edited to reflect the fact that the API changed.

## 5. Make a pull request
Once the operator is done, it's time to [make a pull request](https://github.com/buccaneerai/rxjs-stats/blob/master/CONTRIBUTING.md).


