import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';
import {skip} from 'rxjs/operators';

import roundTo from './roundTo';
import stdev from './stdev';

describe('stdev', () => {
  it('should compute sample variance correctly to 6 decimal places when given a stream of numbers', marbles(m => {
    const trueStandardDeviation = 164.71187;
    const dogSizes = {
      0: 600,
      1: 470,
      2: 170,
      3: 430,
      4: 300,
    };
    const num$ = m.cold('01-(23)--4|', dogSizes);
    const actual$ = num$.pipe(
      stdev(),
      roundTo(6),
      skip(2)
    );
    const expected$ = m.cold('---------v|', {
      v: trueStandardDeviation
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
