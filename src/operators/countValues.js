import _isNaN from 'lodash/isNaN';
import toPairs from 'lodash/toPairs';
import { from } from 'rxjs';
import { map, scan } from 'rxjs/operators';

const reducer = function reducer(valueCounts, nextValue) {
  return {
    ...valueCounts,
    [nextValue]: (
      valueCounts[nextValue]
      ? valueCounts[nextValue] + 1
      : 1
    )
  };
};

const countValues = function countValues(initialState = {}) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(valueCounts => toPairs(valueCounts)),
    map(pairs => pairs.map(p => {
      const num = parseFloat(p[0]);
      return {
        value: _isNaN(num) ? p[0] : num,
        count: p[1]
      };
    }))
  );
};

export default countValues;
