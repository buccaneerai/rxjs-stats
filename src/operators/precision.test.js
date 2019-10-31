import {expect} from 'chai';
import {marbles} from 'rxjs-marbles';

import precision from './precision';

describe('precision', () => {
  it(
    'should compute the percentage of correctly positives: TP / (TP + FP)',
    marbles(m => {
      const inputs = {
        0: [0, 1], // FP
        1: [0, 1], // FP
        2: [0, 1], // FP
        3: [0, 0], // TN
        4: [0, 0], // TN
        5: [1, 1], // TP
        6: [1, 1], // TP
        7: [1, 1], // TP
        8: [1, 1], // TP
        9: [1, 0], // FN
      };
      const input$ = m.cold('-01--2-3-456-7-8-9|', inputs);
      const actual$ = input$.pipe(precision());
      const expected$ = m.cold(
        '-01--2-3-456-7-8-9|',
        {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0.25,
          6: 0.40,
          7: 0.50,
          8: (4/7),
          9: (4/7),
        }
      );
      m.expect(actual$).toBeObservable(expected$);
    })
  );

  it('should handle warm start', marbles(m => {
    const inputs = {
      0: [1, 1], // TP
      1: [1, 1], // TP
      2: [1, 0], // FN
    };
    const input$ = m.cold('-01--2|', inputs);
    const initialState = {
      truePositives: 2,
      falsePositives: 3,
    };
    const actual$ = input$.pipe(precision(initialState));
    const expected$ = m.cold('-01--2|', {
      0: 0.50,
      1: (4/7),
      2: (4/7),
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
