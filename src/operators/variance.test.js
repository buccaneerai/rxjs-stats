import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';
import {skip} from 'rxjs/operators';

import variance from './variance';
import roundTo from './roundTo';

// examples drawn from here:
// https://www.mathsisfun.com/data/standard-deviation.html
// https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/variance/
describe('variance', () => {
  it('should compute sample variance correctly to 6 decimal places when given a stream of numbers', marbles(m => {
    const trueSampleVariance = 27130;
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
      skip(2)
    );
    const expected$ = m.cold('---------v|', {
      v: trueSampleVariance
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
      variance(false),
      roundTo(6),
      skip(2)
    );
    const expected$ = m.cold('---------v|', {v: 21704});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
