import {expect} from 'chai';

import * as operators from './index';

describe('operators', () => {
    it('should export expected modules', () => {
      const api = [
        'accuracy',
        'change',
        'countValues',
        'dirtyR',
        'dirtyZScore',
        'f1',
        'mean',
        'precision',
        'recall',
        'roundTo',
        'stdev',
        'sum',
        'throwUnlessNum',
        'variance',
      ];
      expect(Object.keys(operators)).to.deep.equal(api);
    });
});
