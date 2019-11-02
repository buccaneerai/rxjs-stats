# precision

## Description

Given an Observable of ground-truth labels and predictions, the precision operator returns the [precision](https://en.wikipedia.org/wiki/Precision_and_recall).

## Examples

```javascript
import { from } from 'rxjs';
import { precision } from '@buccaneer/rxjs-stats';

const items = [
  [0, 1], // [trueLabel, prediction]
  [0, 1],
  [0, 1],
  [0, 0],
  [0, 0],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 0],
];

const precision$ = from(items).pipe(
  precision()
);

precision$.subscribe(console.log);
// Output
// 0
// 0
// 0
// 0
// 0
// 0.25
// 0.40
// 0.50
// 0.5714285714
// 0.5714285714
```

## API
```
precision([initialState={truePositives: 0, falsePositives: 0}])
```

### Since
0.5

### Parameters
None

### Options
* `initialState: Object {truePositives: Number, falsePositives: Number}`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a non-zero starting point (instead of a blank state). The initialState should have these keys:
  * `truePositives: Number` is a count of the true positives
  * `falsePositives: Number` is a count of the false positives

### Returns
`Number`. (The current precision of the `Observable`.)
