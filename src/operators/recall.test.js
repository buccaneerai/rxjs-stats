import {expect} from 'chai';
import {marbles} from 'rxjs-marbles';

import recall from './recall';

describe('recall', () => {
  it(
    'should compute the percentage of correctly labelled positives: TP / Actual Positives',
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
      const actual$ = input$.pipe(recall());
      const expected$ = m.cold(
        '-01--2-3-456-7-8-9|',
        {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: (1 / 1),
          6: (2 / 2),
          7: (3 / 3),
          8: (4 / 4),
          9: (4 / 5),
        }
      );
      m.expect(actual$).toBeObservable(expected$);
    })
  );

  it('should compute recall correctly when given a warm start value', marbles(m => {
      const inputs = {
        0: [1, 1], // TP
        1: [1, 1], // TP
        2: [1, 0], // FN
      };
      const input$ = m.cold('-01--2|', inputs);
      const actual$ = input$.pipe(recall({
        truePositives: 500,
        falseNegatives: 50
      }));
      const expected$ = m.cold('-01--2|', {
        0: (501 / 551),
        1: (502 / 552),
        2: (502 / 553),
      });
      m.expect(actual$).toBeObservable(expected$);
    })
  );
});
