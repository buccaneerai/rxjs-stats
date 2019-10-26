# Description

Calculates the differences between each item in an `Observable` and the prior item.

# Examples
```js
import { from } from 'rxjs';
import { change } from '@buccaneer/rxjs-stats';

const num$ = from([2, 4, 8, 16, 26]);
const change$ = num$.pipe(
  change()
);
change$.subscribe(console.log);
// Output:
// 2
// 4
// 8
// 10
```