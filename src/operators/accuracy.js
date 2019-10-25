import sum from 'lodash/sum';
import { map, scan } from 'rxjs/operators';

const computeAccuracy = function computeAccuracy(
  truePositives,
  falsePositives,
  trueNegatives,
  falseNegatives
) {
  const total = sum([truePositives, trueNegatives, falsePositives, falseNegatives]);
  return sum([truePositives, trueNegatives]) / total;
};

function reducer([tPos, fPos, tNeg, fNeg], [trueLabel, predictedLabel]) {
  const truePositives = (
    predictedLabel === 1 && predictedLabel === trueLabel
    ? tPos + 1
    : tPos
  );
  const falsePositives = (
    predictedLabel === 1
    && predictedLabel !== trueLabel
    ? fPos + 1
    : fPos
  );
  const trueNegatives = (
    predictedLabel === 0 && predictedLabel === trueLabel
    ? tNeg + 1
    : tNeg
  );
  const falseNegatives = (
    predictedLabel === 0 && predictedLabel !== trueLabel
    ? fNeg + 1
    : fNeg
  );
  return [truePositives, falsePositives, trueNegatives, falseNegatives];
}

const accuracy = function accuracy() {
  return source$ => source$.pipe(
    scan(reducer, [0, 0, 0, 0]),
    map(counts => computeAccuracy(...counts))
  );
};

export default accuracy;
