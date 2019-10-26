# Description
Calculates the sum of all items in an `Observable`.

# Examples
```js
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