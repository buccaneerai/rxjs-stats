import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';
import {skip, tap} from 'rxjs/operators';

import variance from './variance';
import roundTo from './roundTo';

// examples drawn from here:
// https://www.mathsisfun.com/data/standard-deviation.html
// https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/variance/
describe('variance', () => {
  it('should compute sample variance correctly to 6 decimal places when given a stream of numbers', marbles(m => {
    const dogSizes = {
      0: 600,
      1: 470,
      2: 170,
      3: 430,
      4: 300,
    };
    const num$ = m.cold('01-(23)--4|', dogSizes);
    const actual$ = num$.pipe(
      variance(),
      roundTo(6),
    );
    const expected$ = m.cold('-1-(23)--4|', {
      1: 8450,
      2: 48633.333333,
      3: 32491.666667,
      4: 27130,
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should compute population variance correctly to 6 decimal places when given a stream of numbers', marbles(m => {
    const truePopulationVariance = 21704;
    const heights = {
      0: 600,
      1: 470,
      2: 170,
      3: 430,
      4: 300,
    };
    const num$ = m.cold('01-(23)--4|', heights);
    const actual$ = num$.pipe(
      variance(null, false),
      roundTo(6),
      skip(3)
    );
    const expected$ = m.cold('---------v|', {v: 21704});
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should compute variance correctly when using warm start', marbles(m => {
    const heights = {
      3: 430,
      4: 300,
    };
    const num$ = m.cold('3--4|', heights);
    // state after first three items:
    // const initialState = {index: 2, mean: 535, m2: 8450};
    const initialState = {index: 3, mean: 413.3333333333333, m2: 97266.66666666666};
    const actual$ = num$.pipe(
      variance(initialState),
      roundTo(6),
      skip(1)
    );
    const expected$ = m.cold('---v|', {v: 27130});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
