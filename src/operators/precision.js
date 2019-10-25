import { map, scan } from 'rxjs/operators';

function computePrecision(truePositives, falsePositives) {
  return truePositives / (truePositives + falsePositives);
}

function reducer([truePositive, falsePositive], [trueValue, predictedValue]) {
  const tP = (
    predictedValue === 1 && predictedValue === trueValue
    ? truePositive + 1
    : truePositive
  );
  const fP = (
    predictedValue === 1 && predictedValue !== trueValue
    ? falsePositive + 1
    : falsePositive
  );
  return [tP, fP];
}

const precision = function precision() {
  return source$ => source$.pipe(
    scan(reducer, [0, 0]),
    map(counts => computePrecision(...counts))
  );
};

export default precision;
