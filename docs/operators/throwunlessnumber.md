# throwUnlessNumber

## Description

Emits an `Error` if any item in the `Observable` is `NaN` or of a type that isn't a JavaScript `Number` object.

## Examples

```javascript
import { throwUnlessNum } from '@buccaneer/rxjs-stats';​

const numbers = [
  0,
  1,
  'Muhahaha. I am not actually a number!',
  3,
  4,
  5
];

const output$ = from(numbers).pipe(
  throwUnlessNum()
);

output$.pipe(console.log, console.log);
// Output:
// 0
// 1
// Error
```

## API
```
throwUnlessNum()
```

### Since
0.5

### Parameters
None

### Options
None

### Returns
None. (Throws error if a non-number value is encountered.)

