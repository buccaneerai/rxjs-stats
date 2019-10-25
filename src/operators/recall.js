import { map, scan } from 'rxjs/operators';

function computeRecall(truePositives, falseNegatives) {
  if ((truePositives + falseNegatives) === 0) return 0;
  return truePositives / (truePositives + falseNegatives);
}

function reducer([truePositive, falseNegative], [trueValue, predictedValue]) {
  const truePositives = (
    predictedValue === 1 && predictedValue === trueValue
    ? truePositive + 1
    : truePositive
  );
  const falseNegatives = (
    predictedValue === 0 && predictedValue !== trueValue
    ? falseNegative + 1
    : falseNegative
  );
  return [truePositives, falseNegatives];
}

const recall = function recall() {
  return source$ => source$.pipe(
    scan(reducer, [0, 0]),
    map(counts => computeRecall(...counts))
  );
};

export default recall;
