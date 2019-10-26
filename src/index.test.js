import {expect} from 'chai';

import {accuracy, mean, stdev, variance} from './index';

describe('index', () => {
  it('should export operator functions', () => {
    expect(accuracy).to.be.a('function');
    expect(mean).to.be.a('function');
    expect(stdev).to.be.a('function');
    expect(variance).to.be.a('function');
  });
});
