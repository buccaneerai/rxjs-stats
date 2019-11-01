import times from 'lodash/times';
import {expect} from 'chai';
import {marbles} from 'rxjs-marbles/mocha';

import countValues from './countValues';

describe('countValues', () => {
  it('should count values properly when given strings', marbles(m => {
    const input$ = m.cold('0-(12)-345--6|', {
      0: 'Luke',
      1: 'Frodo',
      2: 'Potter',
      3: 'Luke',
      4: 'Potter',
      5: 'Potter',
      6: 'Potter',
    });
    const actual$ = input$.pipe(countValues());
    const expected$ = m.cold('0-(12)-345--6|', {
      0: [{value: 'Luke', count: 1}],
      1: [{value: 'Luke', count: 1}, {value: 'Frodo', count: 1}],
      2: [{value: 'Luke', count: 1}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 1}],
      3: [{value: 'Luke', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 1}],
      4: [{value: 'Luke', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 2}],
      5: [{value: 'Luke', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 3}],
      6: [{value: 'Luke', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 4}],
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should count values properly when given numbers', marbles(m => {
    const nums = {
      0: 5,
      1: 0,
      2: 4,
      3: 1.67,
      4: 5,
      5: 1.67,
    };
    const input$ = m.cold('-01(23)--45|', nums);
    const actual$ = input$.pipe(countValues());
    const expected$ = m.cold('-01(23)--45|', {
      0: [{value: 5, count: 1}],
      1: [{value: 0, count: 1}, {value: 5, count: 1}],
      2: [{value: 0, count: 1}, {value: 4, count: 1}, {value: 5, count: 1}],
      3: [{value: 0, count: 1}, {value: 4, count: 1}, {value: 5, count: 1}, {value: 1.67, count: 1}],
      4: [{value: 0, count: 1}, {value: 4, count: 1}, {value: 5, count: 2}, {value: 1.67, count: 1}],
      5: [{value: 0, count: 1}, {value: 4, count: 1}, {value: 5, count: 2}, {value: 1.67, count: 2}],
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should handle null values and undefined values', marbles(m => {
    const input$ = m.cold('0-(12)-34|', {
      0: null,
      1: 'Frodo',
      2: 'Potter',
      3: null,
      4: 'Potter',
    });
    const actual$ = input$.pipe(countValues());
    const expected$ = m.cold('0-(12)-34|', {
      0: [{value: 'null', count: 1}],
      1: [{value: 'null', count: 1}, {value: 'Frodo', count: 1}],
      2: [{value: 'null', count: 1}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 1}],
      3: [{value: 'null', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 1}],
      4: [{value: 'null', count: 2}, {value: 'Frodo', count: 1}, {value: 'Potter', count: 2}],
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should properly handle warmstart values', marbles(m => {
    const input$ = m.cold('0-(12)-345--6|', {
      0: 'Luke',
      1: 'Frodo',
      2: 'Potter',
      3: 'Luke',
      4: 'Potter',
      5: 'Potter',
      6: 'Potter',
    });
    const warmstart = {
      keyCounts: 2,
      valueCounts: {'Luke': 24, 'Frodo': 42}
    };
    const actual$ = input$.pipe(countValues(warmstart));
    const expected$ = m.cold('0-(12)-345--6|', {
      0: [{value: 'Luke', count: 25}, {value: 'Frodo', count: 42}],
      1: [{value: 'Luke', count: 25}, {value: 'Frodo', count: 43}],
      2: [{value: 'Luke', count: 25}, {value: 'Frodo', count: 43}, {value: 'Potter', count: 1}],
      3: [{value: 'Luke', count: 26}, {value: 'Frodo', count: 43}, {value: 'Potter', count: 1}],
      4: [{value: 'Luke', count: 26}, {value: 'Frodo', count: 43}, {value: 'Potter', count: 2}],
      5: [{value: 'Luke', count: 26}, {value: 'Frodo', count: 43}, {value: 'Potter', count: 3}],
      6: [{value: 'Luke', count: 26}, {value: 'Frodo', count: 43}, {value: 'Potter', count: 4}],
    });
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should cache only the top 50 values by default', marbles(m => {
    // FIXME
  }));

  it('should change size of cache when cacheSize is set', marbles(m => {
    // FIXME
  }));
});
