import { UserActionInterpreter } from './user-action-interpreter';
import { Side } from './side';
import { Move } from './move';
import { SidePosition, Direction, UserAction, Color } from './enums';

describe('UserActionInterpreter', () => {
  const instance = (side: Side) => new UserActionInterpreter(side);

  describe('resolve', () => {
    describe('Top side selected', () => {
      const side = new Side(Color.Red, SidePosition.Top);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Up2));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(side.selectedCellLocation.x, Direction.Up2));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Down2));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(side.selectedCellLocation.x, Direction.Down2));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });
    });

    describe('Front side selected', () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });
    });

    describe('Bottom side selected', () => {
      const side = new Side(Color.Orange, SidePosition.Bottom);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });
    });

    describe('Back side selected', () => {
      const side = new Side(Color.White, SidePosition.Back);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up));
      });
    });

    describe('Left side selected', () => {
      const side = new Side(Color.Green, SidePosition.Left);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up2));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(side.selectedCellLocation.y, Direction.Up2));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down2));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(side.selectedCellLocation.y, Direction.Down2));
      });
    });

    describe('Right side selected', () => {
      const side = new Side(Color.Blue, SidePosition.Right);
      side.selectCell(0, 0);
      it('should resolve keydown right event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve swipe right event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(side.selectedCellLocation.x, Direction.Right));
      });

      it('should resolve keydown left event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve swipe left event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(side.selectedCellLocation.x, Direction.Left));
      });

      it('should resolve keydown up event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve swipe up event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve keydown down event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve swipe down event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(2, Direction.Up2));
      });
    });
  });
});
