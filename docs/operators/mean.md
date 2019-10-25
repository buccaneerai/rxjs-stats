# Description
Computes the mean (arithmetic average) of an `Observable`.

# Examples
```
import { from } from 'rxjs';
import { mean } from '@buccaneer/rxjs-stats';

const mean$ = from([1, 2, 3, 4]).pipe(
  mean()
);

mean$.subscribe(console.log);
// Output:
// 1
// 1.5
// 2
// 2.5
```

It's odd to calculate the mean of just one item.  Sometimes, it makes more sense to skip the first item to ensure that means are calculated based on more than one number. RxJS makes this easy:

```
import { from } from 'rxjs';
import { skip } from 'rxjs/operators';
import { mean } from '@buccaneer/rxjs-stats';

const mean$ = from([1, 2, 3, 4]).pipe(
  mean(),
  skip(1)
);
```