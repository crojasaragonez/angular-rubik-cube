import { UserActionInterpreter } from './user-action-interpreter';
import { Side, Move, CurrentSelection } from './models';
import { SidePosition, Direction, UserAction, Color } from './enums';

describe('UserActionInterpreter', () => {
  const instance = (side: Side) => {
    side.selectCell(0, 0);
    return new UserActionInterpreter();
  };

  describe('resolve', () => {
    describe('Top side selected', () => {
      const side = new Side(Color.Red, SidePosition.Top);

      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Up2));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(CurrentSelection.location.x, Direction.Up2));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Down2));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(CurrentSelection.location.x, Direction.Down2));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });
    });

    describe('Front side selected', () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });
    });

    describe('Bottom side selected', () => {
      const side = new Side(Color.Orange, SidePosition.Bottom);
      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });
    });

    describe('Back side selected', () => {
      const side = new Side(Color.White, SidePosition.Back);
      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(2, Direction.Right));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(2, Direction.Right));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(2, Direction.Left));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(2, Direction.Left));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(CurrentSelection.location.y, Direction.Down));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(CurrentSelection.location.y, Direction.Up));
      });
    });

    describe('Left side selected', () => {
      const side = new Side(Color.Green, SidePosition.Left);
      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Up2));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(CurrentSelection.location.y, Direction.Up2));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(CurrentSelection.location.y, Direction.Down2));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(CurrentSelection.location.y, Direction.Down2));
      });
    });

    describe('Right side selected', () => {
      const side = new Side(Color.Blue, SidePosition.Right);
      it('should resolve UserAction.RightKey event', () => {
        expect(instance(side).resolve(UserAction.RightKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.SwipeRight event', () => {
        expect(instance(side).resolve(UserAction.SwipeRight)).toEqual(new Move(CurrentSelection.location.x, Direction.Right));
      });

      it('should resolve UserAction.LeftKey event', () => {
        expect(instance(side).resolve(UserAction.LeftKey)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.SwipeLeft event', () => {
        expect(instance(side).resolve(UserAction.SwipeLeft)).toEqual(new Move(CurrentSelection.location.x, Direction.Left));
      });

      it('should resolve UserAction.UpKey event', () => {
        expect(instance(side).resolve(UserAction.UpKey)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve UserAction.SwipeUp event', () => {
        expect(instance(side).resolve(UserAction.SwipeUp)).toEqual(new Move(2, Direction.Down2));
      });

      it('should resolve UserAction.DownKey event', () => {
        expect(instance(side).resolve(UserAction.DownKey)).toEqual(new Move(2, Direction.Up2));
      });

      it('should resolve UserAction.SwipeDown event', () => {
        expect(instance(side).resolve(UserAction.SwipeDown)).toEqual(new Move(2, Direction.Up2));
      });
    });
  });
});
