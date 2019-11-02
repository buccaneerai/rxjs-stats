# recall

## Description

Given an `Observable` of ground-truth labels and predictions, the recall operator returns the [recall](https://en.wikipedia.org/wiki/Precision_and_recall).

## Examples

```javascript
import { from } from 'rxjs';
import { recall } from '@buccaneer/rxjs-stats';

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

const recall$ = from(items).pipe(
  recall()
);

recall$.subscribe(console.log);
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
recall([initialState={truePositives: 0, falseNegatives: 0}])
```

### Since
0.5

### Parameters
None

### Options
* `initialState: Object {truePositives: Number, falseNegatives: Number}`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a non-zero starting point (instead of a blank state). The initialState should have these keys:
  * `truePositives: Number` is a count of the true positives
  * `falseNegatives: Number` is a count of the false negatives

### Returns
`Number`. (The current recall of the `Observable`.)
