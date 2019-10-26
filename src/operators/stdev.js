// Get the variance. Then take its square root.
import { map } from 'rxjs/operators';

import variance from './variance';

const stdev = function stdev(
  sample = true,
  _variance = variance
) {
  return source$ => source$.pipe(
    _variance(sample),
    map(myVariance => Math.sqrt(myVariance))
  );
};

export default stdev;
