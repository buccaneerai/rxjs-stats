# sum

## Description

Calculates the sum of all items in an `Observable`.

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

## API
```
sum([initialState={total: 0}])
```

### Since
0.5

### Parameters
None

### Options
- `initialState: Object {total: Number}`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a non-zero starting point (instead of a blank state).

### Returns
`Number`. (The current sum of the `Observable`.)

