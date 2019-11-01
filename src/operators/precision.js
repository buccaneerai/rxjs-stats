import { map, scan } from 'rxjs/operators';

function computePrecision(truePositives, falsePositives) {
  return truePositives / (truePositives + falsePositives);
}

function reducer({truePositives, falsePositives}, [trueValue, predictedValue]) {
  const tP = (
    predictedValue === 1 && predictedValue === trueValue
    ? truePositives + 1
    : truePositives
  );
  const fP = (
    predictedValue === 1 && predictedValue !== trueValue
    ? falsePositives + 1
    : falsePositives
  );
  return {truePositives: tP, falsePositives: fP};
}

const precision = function precision(
  initialState = {truePositives: 0, falsePositives: 0}
) {
  return source$ => source$.pipe(
    scan(reducer, initialState),
    map(({truePositives, falsePositives}) => computePrecision(
      truePositives,
      falsePositives
    ))
  );
};

export default precision;
