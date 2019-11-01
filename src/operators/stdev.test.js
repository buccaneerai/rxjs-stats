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
    );
    const expected$ = m.cold('-1-(23)--4|', {
      1: 91.923882,
      2: 220.529665,
      3: 180.25445,
      4: 164.71187,
      v: trueStandardDeviation
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should handle warm start value', marbles(m => {
    const trueStandardDeviation = 164.71187;
    const dogSizes = {
      3: 430,
      4: 300,
    };
    const num$ = m.cold('-3-4|', dogSizes);
    const initialState = {index: 3, mean: 413.3333333333333, m2: 97266.66666666666};
    const actual$ = num$.pipe(
      stdev(initialState),
      roundTo(6),
      skip(1)
    );
    const expected$ = m.cold('---v|', {v: trueStandardDeviation});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
