import { map, scan } from 'rxjs/operators';

const reducer = function reducer([, sum, index], nextNum) {
  return [
    (sum + nextNum) / (index + 1),
    sum + nextNum,
    index + 1,
  ];
};

// <T>(): MonoTypeOperatorFunction<T>
const mean = function mean() {
  return source$ => source$.pipe(
    scan(reducer, [null, 0, 0]),
    map(([average]) => average)
  );
};

export default mean;
