import isNil from 'lodash/isNil';
import { filter, map, scan } from 'rxjs/operators';

function reducer([priorNum,], nextNum) {
  if (isNil(priorNum)) return [nextNum, null];
  return [
    nextNum,
    nextNum - priorNum,
  ];
}

const change = function change() {
  return source$ => source$.pipe(
    scan(reducer, [null, null]),
    map(([,delta]) => delta),
    filter(delta => !isNil(delta))
  );
};

export default change;
