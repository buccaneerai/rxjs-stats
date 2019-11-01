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

function reducer(
  {truePositives, falsePositives, trueNegatives, falseNegatives},
  [trueLabel, predictedLabel]
) {
  const newTruePositives = (
    predictedLabel === 1 && predictedLabel === trueLabel
    ? truePositives + 1
    : truePositives
  );
  const newFalsePositives = (
    predictedLabel === 1
    && predictedLabel !== trueLabel
    ? falsePositives + 1
    : falsePositives
  );
  const newTrueNegatives = (
    predictedLabel === 0 && predictedLabel === trueLabel
    ? trueNegatives + 1
    : trueNegatives
  );
  const newFalseNegatives = (
    predictedLabel === 0 && predictedLabel !== trueLabel
    ? falseNegatives + 1
    : falseNegatives
  );
  return {
    truePositives: newTruePositives,
    falsePositives: newFalsePositives,
    trueNegatives: newTrueNegatives,
    falseNegatives: newFalseNegatives
  };
}

const accuracy = function accuracy(
  initialState = {
    truePositives: 0,
    falsePositives: 0,
    trueNegatives: 0,
    falseNegatives: 0
  }
) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(counts => computeAccuracy(
      counts.truePositives,
      counts.falsePositives,
      counts.trueNegatives,
      counts.falseNegatives
    ))
  );
};

export default accuracy;
