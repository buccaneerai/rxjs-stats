import {expect} from 'chai';
import {marbles} from 'rxjs-marbles';

import accuracy from './accuracy';

describe('accuracy', () => {
  it(
    'should compute the percentage of correctly classified instances: (TP + TN) / count',
    marbles(m => {
      const inputs = [
        [0, 1], // FP
        [0, 1], // FP
        [0, 1], // FP
        [0, 0], // TN
        [0, 0], // TN
        [1, 1], // TP
        [1, 1], // TP
        [1, 1], // TP
        [1, 1], // TP
        [1, 0], // FN
      ];
      const input$ = m.cold(
        '-01--2-3-456-7-8-9|',
        inputs.reduce((memo, pair, i) => ({...memo, [i]: pair}), {})
      );
      const actual$ = input$.pipe(accuracy());
      const expected$ = m.cold(
        '-01--2-3-456-7-8-9|',
        {
          0: 0,
          1: 0,
          2: 0,
          3: 0.25,
          4: 0.40,
          5: 0.50,
          6: (4/7),
          7: 0.625,
          8: (6/9),
          9: (6/10),
        }
      );
      m.expect(actual$).toBeObservable(expected$);
    })
  );

  it('should handle warm start', marbles(m => {
    const inputs = [
        [1, 1], // TP
        [1, 1], // TP
        [1, 0], // FN
      ];
    const input$ = m.cold(
      '-01--2|',
      inputs.reduce((memo, pair, i) => ({...memo, [i]: pair}), {})
    );
    const initialState = {
      truePositives: 2,
      falsePositives: 3,
      trueNegatives: 2,
      falseNegatives: 0,
    };
    const actual$ = input$.pipe(accuracy(initialState));
    const expected$ = m.cold('-01--2|', {
      0: 0.625,
      1: (6/9),
      2: (6/10),
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
