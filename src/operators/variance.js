// Calculating variance incrementally can be done using "Welford's online algorithm":
// https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
// http://datagenetics.com/blog/november22017/index.html
// https://math.stackexchange.com/questions/102978/incremental-computation-of-standard-deviation
// https://www.mathsisfun.com/data/standard-deviation-formulas.html
// https://www.investopedia.com/ask/answers/021215/what-difference-between-standard-deviation-and-variance.asp
import { filter, map, scan, skip } from 'rxjs/operators';

function reducer([index, mean, m2], nextNum) {
  if (index === 0) return [index + 1, nextNum, 0];
  const delta = nextNum - mean;
  const newMean = (mean + (delta / (index + 1)));
  const delta2 = nextNum - newMean;
  return [
    index + 1,
    newMean,
    m2 + (delta * delta2),
  ];
}

const variance = function variance(sample = true) {
  return source$ => source$.pipe(
    scan(reducer, [0, 0, null]),
    filter(([index]) => index > 1),
    map(([count,,m2]) => (
      sample
      ? m2 / (count - 1)
      : m2 / count
    )),
    skip(1) // variance requires at least 2 numbers
  );
};

export default variance;
