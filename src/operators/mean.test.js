import { expect } from 'chai';
import { from } from 'rxjs';
import { marbles } from 'rxjs-marbles/mocha';

import mean from './mean';

describe('mean', () => {
  it('should return the correct mean when given an observable of numbers', marbles(m => {
    const num$ = m.cold('a--bc-d--e|', {a: 1, b: 2, c: 3, d: 4, e: 5});
    const actual$ = num$.pipe(mean());
    const expected$ = m.cold('a--bc-d--e|', {a: 1, b: 1.5, c: 2, d: 2.5, e: 3});
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should return correct mean when given a warmstart value', marbles(m => {
    const num$ = m.cold('a--b|', {a: 6, b: 7});
    const warmstart = {average: 3, sum: 15, index: 5};
    const actual$ = num$.pipe(mean(warmstart));
    const expected$ = m.cold('a--b|', {a: 3.5, b: 4});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
