# precision

## Description

Given an Observable of ground-truth labels and predictions, the precision operator returns the [precision](https://en.wikipedia.org/wiki/Precision_and_recall).

## Examples

```text
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

