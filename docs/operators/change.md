# change

## Description

Calculates the differences between each item in an `Observable` and the prior item.

## Examples

```javascript
import { from } from 'rxjs';
import { change } from '@buccaneer/rxjs-stats';

const num$ = from([2, 5, 9, 16, 26]);
const change$ = num$.pipe(
  change()
);
change$.subscribe(console.log);
// Output:
// 3
// 4
// 7
// 10
```

## API
```
change()
```

#### Since
0.5

#### Parameters
None

#### Options
None

#### Returns
`Number`. (The latest difference from the `Observable`)

