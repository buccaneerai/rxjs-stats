import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
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

const f1 = function f1(initialState = {
  truePositives: 0,
  falseNegatives: 0,
  falsePositives: 0,
}) {
  return source$ => {
    const sub$ = source$.pipe(share());
    const recall$ = sub$.pipe(
      recall(pick(initialState, 'truePositives', 'falseNegatives'))
    );
    const precision$ = sub$.pipe(
      precision(pick(initialState, 'truePositives', 'falsePositives'))
    );
    const f1$ = zip(recall$, precision$).pipe(
      map(([recallVal, precisionVal]) => computeF1(recallVal, precisionVal)),
      filter(score => !isNil(score))
    );
    return f1$;
  };
};

export default f1;
