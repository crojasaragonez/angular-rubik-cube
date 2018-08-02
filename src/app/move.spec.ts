import { Move } from './move';
import { Direction } from './enums/direction.enum';

describe('Move', () => {
  it('should have the correct attributes', () => {
    const instance = new Move(0, Direction.Down);
    expect(instance.action).toEqual(Direction.Down);
    expect(instance.value).toEqual(0);
  });

  describe('undo', () => {
    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Up).undo()).toEqual(Direction.Down);
    });

    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Down).undo()).toEqual(Direction.Up);
    });

    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Right).undo()).toEqual(Direction.Left);
    });

    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Left).undo()).toEqual(Direction.Right);
    });

    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Down2).undo()).toEqual(Direction.Up2);
    });

    it('should return the opposite move', () => {
      expect(new Move(0, Direction.Up2).undo()).toEqual(Direction.Down2);
    });
  });
});
