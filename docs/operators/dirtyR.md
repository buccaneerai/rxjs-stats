# dirtyR

## Description

{% hint style="warning" %}
**Warning**: This method is called "dirty" because, by default, it will estimate R values using incremental estimates of the sample mean and standard deviation. This provides faster, streamable results but does not guarantee that the R value will be completely correct for all data sets.
{% endhint %}

Estimates R (the correlation coefficient) of an `Observable`. It will compute the current sample mean and sample standard deviation of the stream and then use those to estimate R.  This allows it to provide estimates quickly and in real-time.

However, R values estimated early in the stream will typically be less correct than those estimated later (because the sample mean and variance will be estimated more correctly as more data points are ingested).  For most large and randomly sampled datasets, the R value will eventually converge to its true values as more items are ingested over time.

## Examples

### Basic Example
```javascript
import { from } from 'rxjs';
import { dirtyR } from '@buccaneer/rxjs-stats';

const instance$ = from([
  // [x, y], // where x is a variable/feature and y is the value to predict
  [600, 75],
  [470, 60],
  [170, 15],
  [430, 40],
  [300, 30],
]);
const r$ = from(instance$).pipe(
  dirtyR()
);

r$.subscribe(console.log);
// 0.5
// 0.8684,
// 0.5723,
// 0.5130
```

## API
```
dirtyR([initialState={meanState: Object, stdevState: Object}])
```

#### Since
1.2

#### Parameters
None

#### Options
* `initialState: Object {meanState: Object, stdevState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the R calculation can continue from a non-zero starting point (instead of a blank state).  Since R is calculated from the mean and standard deviation operators, the warm start values mirror those.  The object should include the following keys:
  * `xZScoreStates: Array`: an array of warm start values for each x value. Each value in the array should be a warm start object for the [dirtyZScore](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/dirtyZScore) operator.
  * `yZScoreState: Object`: a warm start value for the `dirtyZScore` operator. (See [dirtyZScore](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/dirtyZScore).)

#### Returns
`Number`. (The current R of the `Observable`.)


