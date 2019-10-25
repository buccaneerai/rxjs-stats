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
});
