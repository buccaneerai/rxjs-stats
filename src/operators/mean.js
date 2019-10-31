import { map, scan } from 'rxjs/operators';

const reducer = function reducer({sum, index}, nextNum) {
  return {
    average: (sum + nextNum) / (index + 1),
    sum: sum + nextNum,
    index: index + 1,
  };
};

const mean = function mean(initialState = {average: null, sum: 0, index: 0}) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(({average}) => average)
  );
};

export default mean;
