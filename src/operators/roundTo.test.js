import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';

import roundTo from './roundTo';

describe('roundTo', () => {
  it('should round numbers properly', () => marbles(m => {
    const nums = {
      0: 4.5678910,
      1: -5.6989101112,
      2: 3.3e4,
    };
    const input$ = m.cold('--(01)--2|', nums);
    const actual$ = input$.pipe(roundTo(3));
    const expected$ = m.cold('--(01)--2|', {
      0: 4.568,
      1: -5.70,
      2: 118.592,
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
