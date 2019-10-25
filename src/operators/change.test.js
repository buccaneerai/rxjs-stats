import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';

import change from './change';

describe('change', () => {
  it('should calculate the change between the nextNumber and prior number', marbles(m => {
    const nums = {0: 3.5, 1: 7, 2: 12};
    const input$ = m.cold('--0-(12)|', nums);
    const expected$ = m.cold('----(12)|', {1: 3.5, 2: 5});
    const actual$ = input$.pipe(change());
    m.expect(actual$).toBeObservable(expected$);
  }));
});
