import {expect} from 'chai';
import { marbles } from 'rxjs-marbles/mocha';

import throwUnlessNum from './throwUnlessNum';

describe('throwUnlessNum', () => {
  it('should throw error when item is not a number', marbles(m => {
    const err = new Error(
      `notanumber is not a Number. (Did you pass it a String or NaN?)`
    );
    const input$ = m.cold('--a-bc', {a: 1, b: 2, c: 'notanumber'});
    const actual$ = input$.pipe(throwUnlessNum());
    const expected$ = m.cold('--a-b#', {a: 1, b: 2}, err);
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should have no effect when all items are numbers', marbles(m => {
    const input$ = m.cold('--a-bc|', {a: 1, b: 2, c: 5});
    const actual$ = input$.pipe(throwUnlessNum());
    const expected$ = m.cold('--a-bc|', {a: 1, b: 2, c: 5});
    m.expect(actual$).toBeObservable(expected$);
  }));
});
