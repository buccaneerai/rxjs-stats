# accuracy

## Description

Given an `Observable` of ground-truth labels and predictions, the accuracy operator returns the accuracy \(trueness\) of the predicted labels.

## Examples

```javascript
import { from } from 'rxjs';
import { accuracy } from '@buccaneer/rxjs-stats';

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

const accuracy$ = from(items).pipe(
  accuracy()
);

accuracy$.subscribe(console.log);
// Output
// 0
// 0
// 0
// 0.25
// 0.40
// 0.50
// 0.5714285714
// 0.625
// 0.6666666667
// 0.6
```

## API
```
accuracy([initialState={truePositives: 0, falsePositives: 0, trueNegatives: 0, falseNegatives: 0}])
```

**Since**
0.5

**Parameters**
None

**Options**
* `initialState: Object {truePositives: Number, falsePositives: Number, trueNegatives: Number, falseNegatives: Number}`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a non-zero starting point (instead of a blank state).
  * `truePositives: Number` is a count of the true positives
  * `falsePositives: Number` is a count of the false positives
  * `trueNegatives: Number` is a count of the true negatives
  * `falseNegatives Number` is a count of the false negatives

**Returns**
`Number`. (The current accuracy of the `Observable`.)

