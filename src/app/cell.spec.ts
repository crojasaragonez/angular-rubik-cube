import { Cell } from './cell';
import { Color } from './enums';

describe('Cell', () => {
  const instance = new Cell(Color.Red);
  it('should have a color', () => {
    expect(instance.color).toEqual(Color.Red);
  });
});
