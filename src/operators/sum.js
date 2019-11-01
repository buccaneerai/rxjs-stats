import { map, scan } from 'rxjs/operators';

const sum = function sum(initialState = {total: 0}) {
  return source$ => source$.pipe(
    scan(({total}, num) => ({total: total + num}), initialState),
    map(({total}) => total)
  );
};

export default sum;
