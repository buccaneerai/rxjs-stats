import {expect} from 'chai';
import { marbles } from 'rxjs-marbles/mocha';
import { takeLast } from 'rxjs/operators';

import dirtyZScore from './dirtyZScore';
import roundTo from './roundTo';

describe('dirtyZScore', () => {
  it('should compute (dirty) z scores correctly', marbles(m => {
    const trueStandardDeviation = 164.71187;
    const trueMean = 394;
    const dogSizes = {
      0: 600,
      1: 470,
      2: 170,
      3: 430,
      4: 300,
    };
    const num$ = m.cold('01-(23)--4|', dogSizes);
    const actual$ = num$.pipe(
      dirtyZScore(),
      roundTo(4),
    );
    const expected$ = m.cold('-1-(23)--4|', {
      1: -0.7071,
      2: -1.1034,
      3: 0.0693,
      4: -0.5707,
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
