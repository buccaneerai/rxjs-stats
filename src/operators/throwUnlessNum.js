import isNumber from 'lodash/isNumber';
import _isNaN from 'lodash/isNaN';
import { of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const throwUnlessNum = function throwUnlessNum() {
  return source$ => source$.pipe(
    mergeMap(num => (
      isNumber(num) && !_isNaN(num)
      ? of(num)
      : throwError(new Error(`${num} is not a Number. (Did you pass it a String or NaN?)`))
    ))
  );
};

export default throwUnlessNum;
