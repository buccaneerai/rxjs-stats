import {expect} from 'chai';
import { marbles } from 'rxjs-marbles/mocha';
import { takeLast } from 'rxjs/operators';

import dirtyR from './dirtyR';
import roundTo from './roundTo';

describe('dirtyR', () => {
  it('should compute (dirty) z scores correctly', marbles(m => {
    const trueStandardDeviation = 164.71187;
    const trueMean = 394;
    const dogSizeAndWeight = {
      0: [600, 75],
      1: [470, 60],
      2: [170, 15],
      3: [430, 40],
      4: [300, 30],
    };
    const num$ = m.cold('01-(23)--4|', dogSizeAndWeight);
    const actual$ = num$.pipe(
      dirtyR(),
      roundTo(4),
    );
    const expected$ = m.cold('-1-(23)--4|', {
      1: 0.5,
      2: 0.8684,
      3: 0.5723,
      4: 0.5130,
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  // FIXME - should have tests for warm start
  // it('should compute (dirty) z scores correctly', marbles(m => {
  //   const trueStandardDeviation = 164.71187;
  //   const trueMean = 394;
  //   const dogSizeAndWeight = {
  //     0: [600, 75],
  //     1: [470, 60],
  //     2: [170, 15],
  //     3: [430, 40],
  //     4: [300, 30],
  //   };
  //   const num$ = m.cold('01-(23)--4|', dogSizeAndWeight);
  //   const actual$ = num$.pipe(
  //     dirtyR(),
  //     roundTo(4),
  //   );
  //   const expected$ = m.cold('-1-(23)--4|', {
  //     1: 0.5,
  //     2: 0.8684,
  //     3: 0.5723,
  //     4: 0.5130,
  //   });
  //   m.expect(actual$).toBeObservable(expected$);
  // }));
});
