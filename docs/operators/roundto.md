# roundTo

## Description

Rounds numbers in an `Observable` to the number of desired decimal places.

### roundTo\(precision: \)

### Arguments

**precision**: An integer that indicates the number of decimal places to which numbers should be rounded.

### Options

None

## Examples

```javascript
import { from } from 'rxjs';
import { roundTo } from '@buccaneer/rxjs-stats';

const num$ = from([1.234567, 4.5678]);
const roundedNum$ = num$.pipe(
  roundTo(3)
);
roundedNum$.subscribe(console.log);
// Output:
// 1.235
// 4.568
```

