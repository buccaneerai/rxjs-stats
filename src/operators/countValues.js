import _isNaN from 'lodash/isNaN';
import toPairs from 'lodash/toPairs';
import { from } from 'rxjs';
import { map, scan } from 'rxjs/operators';

const reducer = function reducer({valueCounts, keyCount}, nextValue) {
  return {
    keyCount: valueCounts[nextValue] ? keyCount : keyCount + 1,
    valueCounts: {
      ...valueCounts,
      [nextValue]: (
        valueCounts[nextValue]
        ? valueCounts[nextValue] + 1
        : 1
      )
    },
  };
};

const countValues = function countValues(
  initialState = {valueCounts: {}, keyCount: 0}
) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(({valueCounts}) => valueCounts),
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
