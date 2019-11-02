# mean

## Description

Computes the mean \(arithmetic average\) of an `Observable`.

## Examples

### Basic Example
```javascript
import { from } from 'rxjs';
import { mean } from '@buccaneer/rxjs-stats';

const mean$ = from([1, 2, 3, 4]).pipe(
  mean()
);

mean$.subscribe(console.log);
// 1
// 1.5
// 2
// 2.5
```

## API
```
mean([initialState={average: 0, sum: 0, index: 0}])
```

### Since
0.5

### Parameters
None

### Options
- `initialState: Object {average: Number, sum: Number, index: Number`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the mean calculation can continue from a non-zero starting point (instead of a blank state).

### Returns
`Number`. (The current mean of the `Observable`.)

## More Examples

### Skipping the first value
It's odd to calculate the mean of just one item. Sometimes, it makes more sense to skip the first item to ensure that means are calculated based on more than one number. RxJS makes this easy:

```javascript
import { from } from 'rxjs';
import { skip } from 'rxjs/operators';
import { mean } from '@buccaneer/rxjs-stats';

const mean$ = from([1, 2, 3, 4]).pipe(
  mean(),
  skip(1)
);
mean$.subscribe(console.log);
// 1.5
// 2
// 2.5
```

### Warm Start
Calculate a mean with an [initial warmstart value](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) (instead starting with a blank state):
```javascript
import { from } from 'rxjs';
import { mean } from '@buccaneer/rxjs-stats';

// Add another subset of data to a previously calculated mean:
const newNumber$ = from([5, 6, 7, 8]);
const warmstart = {average: 2.5, sum: 10, index: 3};
const mean$ = newNumber$.pipe(
  mean(warmstart)
);
mean$.subscribe(console.log);
// 3
// 3.5
// 4
// 4.5
```

### Using Hotstarts to aggregate multiple streams
Sometimes it is useful to be able to compute a mean from multiple data streams without processing the individual items from each stream. `rxjs-stats` enables this too.  Suppose you have data points from 3 different users' browser applications.  They can be combined into a single mean that represents all three data streams:
```javascript
import { from } from 'rxjs';
import { mean } from '@buccaneer/rxjs-stats';

const user1State = {average: 5, sum: 2500, index: 499};
const user2State = {average: 4, sum: 1600, index: 399};
const user3State = {average: 7, sum: 700, index: 199};
const userStates = [user1State, user2State, user3State];

const initialState = userStates.reduce((totals, user) => ({
  average: (totals.sum + user.sum) / (totals.index + user.index + 1),
  sum: (totals.sum + user.sum),
  index: (totals.index + user.index + 1),
}), {average: 0, sum: 0, index: -1});

const newNumber$ = from([1, 2, 3, 4]);
const aggregateMean$ = newNumber$.pipe(
  mean(initialState)
);
```
In the example above, `aggregateMean$` computes the mean of the data points from all three users without viewing any of their individual information!


