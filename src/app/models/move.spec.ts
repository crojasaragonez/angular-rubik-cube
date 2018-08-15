import { Move } from './move';
import { Direction } from '../enums';

describe('Move', () => {
  it('should have the correct attributes', () => {
    const instance = new Move(0, Direction.Down);
    expect(instance.action).toEqual(Direction.Down);
    expect(instance.value).toEqual(0);
  });

  describe('undo', () => {
    it('should revert all possible moves', () => {
      expect(new Move(0, Direction.Up).undo()).toEqual(new Move(0, Direction.Down));
      expect(new Move(0, Direction.Down).undo()).toEqual(new Move(0, Direction.Up));
      expect(new Move(0, Direction.Right).undo()).toEqual(new Move(0, Direction.Left));
      expect(new Move(0, Direction.Left).undo()).toEqual(new Move(0, Direction.Right));
      expect(new Move(0, Direction.Down2).undo()).toEqual(new Move(0, Direction.Up2));
      expect(new Move(0, Direction.Up2).undo()).toEqual(new Move(0, Direction.Down2));
    });
  });
});
