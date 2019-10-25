import { map } from 'rxjs/operators';

function round(number, precision, method) {
  let _number = number;
  if (!Number.isInteger(precision)) {
    throw new Error('Expected precision to be an integer');
  }

  const isRoundingAndNegative = (method === 'round' && number < 0);
  if (isRoundingAndNegative) _number = Math.abs(number);

  let exponent;
  [_number, exponent] = `${_number}e`.split('e');
  let result = Math[method](`${_number}e${Number(exponent) + precision}`);

  [_number, exponent] = `${result}e`.split('e');
  result = Number(`${_number}e${Number(exponent) - precision}`);

  if (isRoundingAndNegative) result = -result;
  return result;
}

const roundTo = function roundTo(precision = 2) {
  return source$ => source$.pipe(
    map(num => round(num, precision, 'round'))
  );
};

export default roundTo;
