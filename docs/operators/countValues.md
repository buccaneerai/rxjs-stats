# sum

## Description

Calculates the sum of all items in an `Observable`.

## API
```
countValues([initialState={valueCounts: {}, keyCount: 0}])
```

### Since
1.0

### Parameters
None

### Options
- `initialState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warm-start) value so that the calculation can continue from a starting point (instead of a blank state).  Example: `{valueCounts: {myFirstValue: 32, mySecondValue: 5, myThirdValue: 42}, keyCount: 3}`.

### Returns
`Number`. (The current sum of the `Observable`.)

## Examples

```javascript
import { from } from 'rxjs';
import { sum } from '@buccaneer/rxjs-stats';

const num$ = from([1, 2, 3, 4, 5]);
const sum$ = num$.pipe(
  sum()
);
num$.subscribe(console.log);
// Output:
// 1
// 3
// 6
// 10
// 15
```

