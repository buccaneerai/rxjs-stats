// Calculating variance incrementally can be done using "Welford's online algorithm":
// https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
// http://datagenetics.com/blog/november22017/index.html
// https://math.stackexchange.com/questions/102978/incremental-computation-of-standard-deviation
// https://www.mathsisfun.com/data/standard-deviation-formulas.html
// https://www.investopedia.com/ask/answers/021215/what-difference-between-standard-deviation-and-variance.asp
import { filter, map, scan, skip } from 'rxjs/operators';

function reducer({index, mean, m2}, nextNum) {
  if (index === 0) return {index: index + 1, mean: nextNum, m2: 0};
  const delta = nextNum - mean;
  const newMean = (mean + (delta / (index + 1)));
  const delta2 = nextNum - newMean;
  return {
    index: index + 1,
    mean: newMean,
    m2: m2 + (delta * delta2),
  };
}

const variance = function variance(
  initialState,
  sample = true
) {
  return source$ => source$.pipe(
    scan(reducer, initialState || {index: 0, mean: 0, m2: null}),
    filter(({index}) => index > 1),
    map(({index,m2}) => (
      sample
      ? m2 / (index - 1)
      : m2 / index
    )),
    // skip( // variance requires at least 2 numbers
    //   initialState && initialState.index > 1
    //   ? 0
    //   : 1
    // )
  );
};

export default variance;
