import { zip } from 'rxjs';
import { map, share, skip, tap } from 'rxjs/operators';

import mean from './mean';
import stdev from './stdev';

// https://www.khanacademy.org/math/ap-statistics/bivariate-data-ap/correlation-coefficient-r/v/calculating-correlation-coefficient-r
const dirtyZScore = function dirtyZScore(initialState) {
  return source$ => {
    const skipCount = (
      initialState && initialState.stdevState && initialState.stdevState > 0
      ? 0
      : 1
    );
    const sourceSub$ = source$.pipe(share());
    const mean$ = sourceSub$.pipe(
      (
        initialState && initialState.meanState
        ? mean(initialState.meanState)
        : mean()
      ),
      skip(skipCount) // FIXME - should only skip when the stdev skips...
    );
    const stdev$ = sourceSub$.pipe(
      initialState && initialState.stdevState
      ? stdev(initialState.stdevState)
      : stdev()
    );
    const zScore$ = zip(
      sourceSub$.pipe(skip(skipCount)),
      mean$,
      stdev$
    ).pipe(
      map(([instanceVal, _mean, _stdev]) => ((instanceVal - _mean) / _stdev))
    );
    return zScore$;
  };
};

export default dirtyZScore;
