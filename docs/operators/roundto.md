# roundTo

## Description

Rounds numbers in an `Observable` to the number of desired decimal places.

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

## API
```
sum(numDecimalPlaces: Number)
```

### Since
0.5

### Parameters
* `numDecimalPlaces`: An integer that indicates the number of decimal places to which numbers should be rounded.

### Options
None

### Returns
`Number`. (Numbers from `Observable`, rounded to the correct number of decimal places.)

