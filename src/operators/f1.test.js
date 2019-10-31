import {expect} from 'chai';
import {marbles} from 'rxjs-marbles';
import {skip} from 'rxjs/operators';

import f1 from './f1';
import roundTo from './roundTo';

// example from https://towardsdatascience.com/multi-class-metrics-made-simple-part-ii-the-f1-score-ebe8b2c2ca1
describe('f1', () => {
  it(
    'should compute the correct F1 score: 2 × (precision × recall)/(precision + recall)',
    marbles(m => {
      const inputs = {
        0: [0, 1], // FP
        1: [1, 0], // FN
        2: [1, 0], // FN
        3: [0, 0], // TN
        4: [0, 0], // TN
        5: [1, 1], // TP
        6: [1, 1], // TP
        7: [1, 1], // TP
        8: [1, 1], // TP
        9: [1, 1], // TP
      };
      const input$ = m.cold('-01--2-3(456)-7-8-9|', inputs);
      const actual$ = input$.pipe(
        f1(),
        roundTo(6),
        skip(5)
      );
      const expected$ = m.cold(
        // '-01--2-3(456)-7-8-9|',
        '--------(56)--7-8-9|',
        {
          // 0: null,
          // 1: null,
          // 2: null,
          // 3: null,
          // 4: null,
          5: 0.4,
          6: 0.571429,
          7: 0.666667,
          8: 0.727273,
          9: 0.769231,
        }
      );
      m.expect(actual$).toBeObservable(expected$);
    })
  );

  it('should handle warm start', marbles(m => {
    const inputs = {
      7: [1, 1], // TP
      8: [1, 1], // TP
      9: [1, 1], // TP
    };
    const input$ = m.cold('-7-8-9|', inputs);
    const initialState = {
      truePositives: 2,
      falsePositives: 1,
      falseNegatives: 2,
    };
    const actual$ = input$.pipe(
      f1(initialState),
      roundTo(6)
    );
    const expected$ = m.cold('-7-8-9|', {
      7: 0.666667,
      8: 0.727273,
      9: 0.769231,
    });
    m.expect(actual$).toBeObservable(expected$);
  }));
});
