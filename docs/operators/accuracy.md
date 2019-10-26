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

