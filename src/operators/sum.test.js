import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';

import sum from './sum';

describe('sum', () => {
  it('should add numbers correctly', marbles(m => {
    const input$ = m.cold('-a--bc---d|', {a: 2.5, b: -2.5, c: 3, d: 7});
    const actual$ = input$.pipe(sum());
    const expected$ = m.cold('-a--bc---d|', {a: 2.5, b: 0, c: 3, d: 10});
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should handle warm start value', marbles(m => {
    const input$ = m.cold('-a--bc---d|', {a: 2.5, b: -2.5, c: 3, d: 7});
    const actual$ = input$.pipe(sum({total: 50}));
    const expected$ = m.cold('-a--bc---d|', {a: 52.5, b: 50, c: 53, d: 60});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
