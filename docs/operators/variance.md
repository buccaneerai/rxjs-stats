# Description
Computes the variance of an `Observable` using [Welford's Online Algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm).

By default, it will compute the sample variance.

### variance(sample: <Boolean>)

### Arguments
**sample**: The default is `true`. If `true`, then it will calculate the sample variance.  Otherwise, it will calculate population variance.

# Examples

### Sample Variance
``` javascript
import { from } from 'rxjs';
import { takeLast } from 'rxjs';
import { variance } from '@buccaneer/rxjs-stats';

const variance$ = from([600, 470, 170, 430, 300]).pipe(
  variance(),
  takeLast(1)
);

variance$.subscribe(console.log);
// Output:
// 27130
```

### Population Variance
``` javascript
import { from } from 'rxjs';
import { takeLast } from 'rxjs';
import { variance } from '@buccaneer/rxjs-stats';

const variance$ = from([600, 470, 170, 430, 300]).pipe(
  variance(false),
  takeLast(1)
);

variance$.subscribe(console.log);
// Output:
// 21704
```