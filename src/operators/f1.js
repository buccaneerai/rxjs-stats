import isNil from 'lodash/isNil';
import BigNumber from 'bignumber.js';
import { zip } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

import recall from './recall';
import precision from './precision';

function computeF1(recallScore, precisionScore) {
  // return 1 / (((1 / recallScore) + (1 / precisionScore)) / 2);
  const f1 = (
    (2 * (recallScore * precisionScore)) / (recallScore + precisionScore)
  );
  return f1;
  // const bigRecall = new BigNumber(recallScore);
  // return bigRecall.multipliedBy(precisionScore)
  //   .multipliedBy(2)
  //   .dividedBy(
  //     precisionScore.plus(recallScore)
  //   );
}

const f1 = function f1() {
  return source$ => {
    const sub$ = source$.pipe(share());
    const recall$ = sub$.pipe(recall());
    const precision$ = sub$.pipe(precision());
    const f1$ = zip(recall$, precision$).pipe(
      map(([recallVal, precisionVal]) => computeF1(recallVal, precisionVal)),
      filter(score => !isNil(score))
    );
    return f1$;
  };
};

export default f1;
