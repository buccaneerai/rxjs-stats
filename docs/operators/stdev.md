# stdev

## Description

Computes the sample standard deviation of an `Observable` using \[Welford's Online Algorithm\]\([https://en.wikipedia.org/wiki/Algorithms\_for\_calculating\_variance\#Welford's\_online\_algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)\).

#### stdev\(\)

#### Arguments

None

### Options

None

## Examples

```javascript
import { from } from 'rxjs';
import { takeLast } from 'rxjs';
import { stdev, roundTo } from '@buccaneer/rxjs-stats';

const stdev$ = from([600, 470, 170, 430, 300]).pipe(
  stdev(),
  takeLast(1),
  roundTo(6)
);

stdev$.subscribe(console.log);
// Output:
// 164.71187
```

