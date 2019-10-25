import { scan } from 'rxjs/operators';

const sum = function sum() {
  return source$ => source$.pipe(
    scan((memo, num) => memo + num, 0)
  );
};

export default sum;
