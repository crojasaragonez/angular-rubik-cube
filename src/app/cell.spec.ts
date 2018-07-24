import { Cell } from './cell';

describe('Cell', () => {
  const instance = new Cell('red');
  it('should have a color', () => {
    expect(instance.color).toEqual('red');
  });
});
