# stdev

## Description

Computes the sample standard deviation of an `Observable` using [Welford's Online Algorithm](https://en.wikipedia.org/wiki/Algorithms\_for\_calculating\_variance\#Welford's\_online\_algorithm) .

By default, it will compute the sample (rather than population) standard deviation.

## Examples

```javascript
import { from } from 'rxjs';
import { takeLast } from 'rxjs';
import { stdev, roundTo } from '@buccaneer/rxjs-stats';

const stdev$ = from([600, 470, 170, 430, 300]).pipe(
  stdev(),
  takeLast(1),
  roundTo(6)
);

stdev$.subscribe(console.log);
// Output:
// 164.71187
```

## API
```
stdev(
  [initialState={index: 0, mean: 0, m2: null}],
  [sample=true]
)
```

### Since
0.5

### Parameters
None

### Options
* `initialState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a non-zero starting point (instead of a blank state). The initialState should have these keys:
  * `index: Number`: The starting index. (The total number of items in the sample minus one.)
  * `mean: Number`: The initial mean of the sample.
  * `m2: Number` The initial m2 value for the sample.  (See the [source code](https://github.com/buccaneerai/rxjs-stats/blob/operators/variance.js) to see how m2 is calculated.)
* `sample: Boolean`: The default is `true`. If `true`, then it will calculate the sample variance. Otherwise, it will calculate population variance.

### Returns
`Number`. (The current variance of the `Observable`.)

### Arguments
None

### Options
None

