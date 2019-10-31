import { map, scan } from 'rxjs/operators';

function computeRecall(truePositives, falseNegatives) {
  if ((truePositives + falseNegatives) === 0) return 0;
  return truePositives / (truePositives + falseNegatives);
}

function reducer({truePositives, falseNegatives}, [trueValue, predictedValue]) {
  const newTruePositives = (
    predictedValue === 1 && predictedValue === trueValue
    ? truePositives + 1
    : truePositives
  );
  const newFalseNegatives = (
    predictedValue === 0 && predictedValue !== trueValue
    ? falseNegatives + 1
    : falseNegatives
  );
  return {
    truePositives: newTruePositives,
    falseNegatives: newFalseNegatives
  };
}

const recall = function recall(
  initialState = {truePositives: 0, falseNegatives: 0}
) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(({truePositives, falseNegatives}) => computeRecall(
      truePositives,
      falseNegatives
    ))
  );
};

export default recall;
