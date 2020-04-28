# dirtyZScore

## Description

{% hint style="warning" %}
**Warning**: This method is called "dirty" because, by default, it will estimate z-score values using incremental estimates of the sample mean and standard deviation. This provides faster, streamable results but does not guarantee that the z-score value will be completely correct, especially for early values in the pipeline where it has not calculated a stable value for the mean and standard deviation.
{% endhint %}

Estimates z-score (the correlation coefficient) of an `Observable`. It will compute the current sample mean and sample standard deviation of the stream and then use those to estimate the z-score.  This allows it to provide estimates quickly and in real-time.

However, z-score values estimated early in the stream will typically be less correct than those estimated later (because the sample mean and variance will be estimated more correctly as more data points are ingested).  For most large and randomly sampled datasets, the z-score value will eventually converge to its true values as more items are ingested over time.

## API
```
dirtyZScore([initialState={meanState: Object, stdevState: Object}])
```

### Since
1.2

### Parameters
None

### Options
* `initialState: Object {meanState: Object, stdevState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the z-score calculation can continue from a non-zero starting point (instead of a blank state).  Since z-score is calculated from the mean and standard deviation operators, the warm start values mirror those.  The object should include the following keys:
  * `meanState`: a warm start value for the `mean` operator. (See [mean](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/mean).)
  * `stdevState`: a warm start value for the `stdev` operator. (See [stdev](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/stdev).)

### Returns
`Number`. (The current zScore of the `Observable`.)

## Examples

### Basic Example
```javascript
import { from } from 'rxjs';
import { dirtyZScore } from '@buccaneer/rxjs-stats';

const zombiePirateHeight$ = [
  600,
  470,
  170,
  430,
  300,
];
const zScore$ = from(zombiePirateHeight$).pipe(
  dirtyZScore()
);

zScore$.subscribe(console.log);
// -0.7071
// -1.1034
// 0.0693
// -0.5707
```


