import { map, scan } from 'rxjs/operators';

const sum = function sum(initialState = {sum: 0}) {
  return source$ => source$.pipe(
    scan(({sum}, num) => ({sum: sum + num}), initialState),
    map(({sum}) => sum)
  );
};

export default sum;
