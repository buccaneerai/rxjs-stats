import { zip } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';

import dirtyZScore from './dirtyZScore';

function numeratorReducer({numerator, index}, [xZScore, yZScore]) {
  return {
    index: index + 1,
    numerator: numerator + (xZScore * yZScore),
  };
}

const dirtyR = function dirtyR() {
  return source$ => {
    const sourceSub$ = source$.pipe(share());
    const xZScore$ = sourceSub$.pipe(
      map(pair => pair[0]),
      dirtyZScore()
    );
    const yZScore$ = sourceSub$.pipe(
      map(pair => pair[1]),
      dirtyZScore()
    );
    const R$ = zip(xZScore$, yZScore$).pipe(
      scan(numeratorReducer, {numerator: 0, index: 0}),
      map(({numerator, index}) => numerator / index)
    );
    return R$;
  };
};

export default dirtyR;
