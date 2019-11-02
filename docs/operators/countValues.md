# countValues

## Description

Calculates the sum of all items in an `Observable`.

## Examples

```javascript
import { from } from 'rxjs';
import { countValues } from '@buccaneer/rxjs-stats';

const item$ = from([1, 2, 2, 2, 'foo', 'foo']);
const counts$ = item$.pipe(
  countValues()
);
counts$.subscribe(console.log);
// Output:
// [{value: 1, count: 1}]
// [{value: 1, count: 1}, {value: 2, count: 1}]
// [{value: 1, count: 1}, {value: 2, count: 2}]
// [{value: 1, count: 1}, {value: 2, count: 3}]
// [{value: 1, count: 1}, {value: 2, count: 1}, {value: 'foo', count: 1}]
// [{value: 1, count: 1}, {value: 2, count: 1}, {value: 'foo', count: 2}]
```

## API
```
countValues([initialState={valueCounts: {}, keyCount: 0}])
```

#### Since
1.2

#### Parameters
None

#### Options
- `initialState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the calculation can continue from a starting point (instead of a blank state).  Example: `{valueCounts: {myFirstValue: 32, mySecondValue: 5, myThirdValue: 42}, keyCount: 3}`.

#### Returns
`Number`. (The current sum of the `Observable`.)

