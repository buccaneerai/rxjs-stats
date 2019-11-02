# dirtyR

## Description

{% hint style="warning" %}
**Warning**: This method is called "dirty" because, by default, it will estimate R values using incremental estimates of the sample mean and standard deviation. This provides faster, streamable results but does not guarantee that the R value will be completely correct for all data sets.
{% hint %}

Estimates R (the correlation coefficient) of an `Observable`. It will compute the current sample mean and sample standard deviation of the stream and then use those to estimate R.  This allows it to provide estimates quickly and in real-time.

However, R values estimated early in the stream will typically be less correct than those estimated later (because the sample mean and variance will be estimated more correctly as more data points are ingested).  For most large and randomly sampled datasets, the R value will eventually converge to its true values as more items are ingested over time.

## API
```
dirtyR([initialState={meanState: Object, stdevState: Object}])
```

### Since
1.2

### Parameters
None

### Options
* `initialState: Object {meanState: Object, stdevState: Object`: Sets a [warm start](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts) value so that the zScore calculation can continue from a non-zero starting point (instead of a blank state).  Since zScore is calculated from the mean and standard deviation operators, the warm start values mirror those.  The object should include the following keys:
  * `meanState`: a warm start value for the `mean` operator. (See [mean](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/mean).)
  * `stdevState`: a warm start value for the `stdev` operator. (See [stdev](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators/stdev).)

### Returns
`Number`. (The current mean of the `Observable`.)

## Examples

### Basic Example
```javascript
import { from } from 'rxjs';
import { dirtyR } from '@buccaneer/rxjs-stats';

const R$ = from([1, 2, 3, 4]).pipe(
  dirtyR()
);

R$.subscribe(console.log);
// 1
// 1.5
// 2
// 2.5
```


