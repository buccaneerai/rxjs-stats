# Using Warm Starts

## Overview
Many `rxjs-stats` operators support a "warm start value".  A warm start value provides initial (non-blank) state for an operator.  This technique allows applications to continue calculating values without re-processing data that has already been processed.  In other words, setting an initial state lets calculations pick up from where they last left off.

Here is a concrete example using the `mean` operator:
```javascript
import { from } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { mean } from '@buccaneer/rxjs-stats';

const number$ = from([1, 2, 3, 42]);
const initialMean$ = number$.pipe(
  mean(),
  takeLast(1)
);
initialMean$.subscribe(console.log);
// 12
```

The mean of the number stream above is `12`.  But suppose some new data points come in and, as a result, the mean needs to be updated. The warm start technique can used to calculate the new mean based on the original one:
```javascript
// The mean operator's initial state can be set like so:
const initialState = {average: 12, sum: 48, index: 3};
const newNumber$ = from([50, 9, 20]);
const newMean$ = newNumber$.pipe(
  mean(initialState),
  takeLast(1)
);
newMean$.subscribe(console.log);
// 18.1428571429
```

The mean has been re-computed without knowing anything about the individual items that were contained in the original sequence!  Pretty spiffy.  But what is it useful for?

## Common Use Cases
The warm start technique is useful in at least a few situations:

**Recalculating a value based on new data in a large data set**.  Warm starts are useful when an application has already calculated a value and it is necessary to recalculate the value based on additional data.  Assuming that the original data stream is unchanged, warm start values allow the value to be updated without recalculating the first set of values.  Imagine that you had 10 million data points -- recalculating the true mean for the first 10 million items would be a non-trivial expenditure of time and compute power.  

**Masking data for privacy**.  Warm starts allow applications to collect metrics without storing or sharing the original data.  For example, the information being processed might contain data protected by HIPAA or simply information that discerning software makers want to keep private.

**Resuming a calculation that stopped due to a fatal exception**.  Let's give you the benefit of the doubt and assume your code is always perfect and bug-free...  Even then, software will eventually find ways to fail.  Perhaps there was a hardware fault due to an unexpected [Dalek](https://en.wikipedia.org/wiki/Dalek) invasion.  It's nice to be able to recover when this sort of thing happens.  The warm start technique creates an opportunity to restart a pipeline where it left off, assuming that the intermittant results are cached somewhere.  If you're using a database, you can often just restart the calculation at the index (or timestamp) you left off at.

**Aggregating results from multiple streams**.  Warm start values can often be aggregated from multiple streams and then used to calculate a single result.  For example, suppose an application is collecing metrics from three users and the goal is to combine aggregates from each user into a single value that represents the aggregate of all three event streams.  Some `rxjs-stats` operators support this type of aggregation.  (The operators that support this functionality have code examples in their documentation.)

