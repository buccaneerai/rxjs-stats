// Get the variance. Then take its square root.
import { map } from 'rxjs/operators';

import variance from './variance';

const stdev = function stdev(
  initialState,
  sample = true,
  _variance = variance
) {
  return source$ => source$.pipe(
    _variance(initialState || {index: 0, mean: 0, m2: null}, sample),
    map(myVariance => Math.sqrt(myVariance))
  );
};

export default stdev;
