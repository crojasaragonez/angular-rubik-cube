import { Cube } from './cube';
import { Side } from './side';
import { Move } from './move';
import { SidePosition, Color, Direction } from '../enums';

describe('Cube', () => {
  const instance = new Cube();
  const selected_side = new Side(Color.Yellow, SidePosition.Front);
  selected_side.selectCell(0, 0);

  describe('reset', () => {
    it('should reset default attributes in the cube', () => {
      instance.reset();
      expect(instance[SidePosition.Top]).toEqual( new Side(Color.Red, SidePosition.Top));
      expect(instance[SidePosition.Bottom]).toEqual(new Side(Color.Orange, SidePosition.Bottom));
      expect(instance[SidePosition.Left]).toEqual(new Side(Color.Green, SidePosition.Left));
      expect(instance[SidePosition.Right]).toEqual(new Side(Color.Blue, SidePosition.Right));
      expect(instance[SidePosition.Back]).toEqual(new Side(Color.White, SidePosition.Back));
      expect(instance[SidePosition.Front]).toEqual(selected_side);
      expect(instance['rotateX']).toEqual(-18);
      expect(instance['rotateY']).toEqual(36);
      expect(instance['history']).toEqual([]);
    });
  });

  describe('findSelectedSide', () =>  {
    it('should find the current selected position', () => {
      expect(instance.findSelectedSide()).toEqual(selected_side);
    });
  });

  describe('resetSelection', () => {
    it('should reset the current selected position', () => {
      instance.resetSelection();
      expect(instance.findSelectedSide()).toEqual(undefined);
    });
  });

  describe('undo', () => {

    beforeEach(() => instance.reset());

    it('should revert every possible move', () => {
      Object.keys(Direction).forEach(key => {
        const cube = new Cube();
        const move = new Move(0, Direction[key]);
        cube.move(move);
        spyOn(cube, 'move');
        cube.undo();
        expect(cube.move).toHaveBeenCalledWith(move.undo(), false);
      });
    });

    it('should keep history consistent', () => {
      instance.move(new Move(0, Direction.Left));
      instance.move(new Move(0, Direction.Right));
      instance.move(new Move(0, Direction.Up));
      instance.move(new Move(0, Direction.Down));
      expect(instance['history'].length).toEqual(4);
    });

    it('should remove last item in history after a revert', () => {
      instance.move(new Move(0, Direction.Left));
      instance.move(new Move(0, Direction.Right));
      instance.move(new Move(0, Direction.Up));
      instance.move(new Move(0, Direction.Down));
      instance.undo();
      expect(instance['history'].length).toEqual(3);
    });
  });

  describe('moveDown', () => {
    it('should rotate left side of the cube when column is 0', () => {
      spyOn(instance[SidePosition.Left], 'rotateLeft');
      instance.move(new Move(0, Direction.Down));
      expect(instance[SidePosition.Left].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate right side of the cube when column is 2', () => {
      spyOn(instance[SidePosition.Right], 'rotateRight');
      instance.move(new Move(2, Direction.Down));
      expect(instance[SidePosition.Right].rotateRight).toHaveBeenCalled();
    });
  });

  describe('moveDown2', () => {
    it('should rotate back side of the cube when column is 0', () => {
      spyOn(instance[SidePosition.Back], 'rotateLeft');
      instance.move(new Move(0, Direction.Down2));
      expect(instance[SidePosition.Back].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate front side of the cube when column is 2', () => {
      spyOn(instance[SidePosition.Front], 'rotateRight');
      instance.move(new Move(2, Direction.Down2));
      expect(instance[SidePosition.Front].rotateRight).toHaveBeenCalled();
    });
  });

  describe('moveUp', () => {
    it('should rotate left side of the cube when column is 0', () => {
      spyOn(instance[SidePosition.Left], 'rotateRight');
      instance.move(new Move(0, Direction.Up));
      expect(instance[SidePosition.Left].rotateRight).toHaveBeenCalled();
    });
    it('should rotate right side of the cube when column is 2', () => {
      spyOn(instance[SidePosition.Right], 'rotateLeft');
      instance.move(new Move(2, Direction.Up));
      expect(instance[SidePosition.Right].rotateLeft).toHaveBeenCalled();
    });
  });

  describe('moveRight', () => {
    it('should rotate top side of the cube when column is 0', () => {
      spyOn(instance[SidePosition.Top], 'rotateRight');
      instance.move(new Move(0, Direction.Right));
      expect(instance[SidePosition.Top].rotateRight).toHaveBeenCalled();
    });
    it('should rotate bottom side of the cube when column is 2', () => {
      spyOn(instance[SidePosition.Bottom], 'rotateLeft');
      instance.move(new Move(2, Direction.Right));
      expect(instance[SidePosition.Bottom].rotateLeft).toHaveBeenCalled();
    });
  });

  describe('moveLeft', () => {
    it('should rotate top side of the cube when column is 0', () => {
      spyOn(instance[SidePosition.Top], 'rotateLeft');
      instance.move(new Move(0, Direction.Left));
      expect(instance[SidePosition.Top].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate bottom side of the cube when column is 2', () => {
      spyOn(instance[SidePosition.Bottom], 'rotateRight');
      instance.move(new Move(2, Direction.Left));
      expect(instance[SidePosition.Bottom].rotateRight).toHaveBeenCalled();
    });
  });

  describe('corner consistency', () => {
    beforeEach(() => {
      instance.reset();
    });
    describe('red, yellow, green', () => {
      it('should have the right colors', () => {
        expect(instance.front.cells[0][0].color).toEqual(Color.Yellow);
        expect(instance.left.cells[0][2].color).toEqual(Color.Green);
        expect(instance.top.cells[2][0].color).toEqual(Color.Red);
      });
    });

    describe('red, blue, yellow', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[2][2].color).toEqual(Color.Red);
        expect(instance.right.cells[0][0].color).toEqual(Color.Blue);
        expect(instance.front.cells[0][2].color).toEqual(Color.Yellow);
      });
    });

    describe('red, white, blue', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[0][2].color).toEqual(Color.Red);
        expect(instance.back.cells[2][2].color).toEqual(Color.White);
        expect(instance.right.cells[0][2].color).toEqual(Color.Blue);
      });
    });

    describe('red, green, white', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[0][0].color).toEqual(Color.Red);
        expect(instance.left.cells[0][0].color).toEqual(Color.Green);
        expect(instance.back.cells[2][0].color).toEqual(Color.White);
      });
    });

    describe('red, yellow, green', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[2][0].color).toEqual(Color.Red);
        expect(instance.front.cells[0][0].color).toEqual(Color.Yellow);
        expect(instance.left.cells[0][2].color).toEqual(Color.Green);
      });
    });

    //////////////////////////////////////////////////////////

    describe('orange, green, yellow', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[0][0].color).toEqual(Color.Orange);
        expect(instance.left.cells[2][2].color).toEqual(Color.Green);
        expect(instance.front.cells[2][0].color).toEqual(Color.Yellow);
      });
    });

    describe('orange, white, green', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[2][0].color).toEqual(Color.Orange);
        expect(instance.back.cells[0][0].color).toEqual(Color.White);
        expect(instance.left.cells[2][0].color).toEqual(Color.Green);
      });
    });

    describe('orange, blue, white', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[2][2].color).toEqual(Color.Orange);
        expect(instance.right.cells[2][2].color).toEqual(Color.Blue);
        expect(instance.back.cells[0][2].color).toEqual(Color.White);
      });
    });

    describe('orange, yellow, blue', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[0][2].color).toEqual(Color.Orange);
        expect(instance.front.cells[2][2].color).toEqual(Color.Yellow);
        expect(instance.right.cells[2][0].color).toEqual(Color.Blue);
      });
    });
  });

  describe('cell consistency after some moves', () => {
    beforeEach(() => {
      instance.reset();
    });

    const side_colors = (side: Side) => side.cells.map(c => c.map(e => e.color));

    describe('moveDown', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Down));
        expect(side_colors(instance.front)).toEqual([ [Color.Red, Color.Yellow, Color.Yellow],
                                                      [Color.Red, Color.Yellow, Color.Yellow],
                                                      [Color.Red, Color.Yellow, Color.Yellow]]);

        expect(side_colors(instance.bottom)).toEqual([[Color.Yellow, Color.Orange, Color.Orange],
                                                      [Color.Yellow, Color.Orange, Color.Orange],
                                                      [Color.Yellow, Color.Orange, Color.Orange]]);

        expect(side_colors(instance.back)).toEqual([  [Color.Orange, Color.White, Color.White],
                                                      [Color.Orange, Color.White, Color.White],
                                                      [Color.Orange, Color.White, Color.White]]);

        expect(side_colors(instance.top)).toEqual([   [Color.White, Color.Red, Color.Red],
                                                      [Color.White, Color.Red, Color.Red],
                                                      [Color.White, Color.Red, Color.Red]]);

        expect(side_colors(instance.left)).toEqual([  [Color.Green, Color.Green, Color.Green],
                                                      [Color.Green, Color.Green, Color.Green],
                                                      [Color.Green, Color.Green, Color.Green]]);

        expect(side_colors(instance.right)).toEqual([ [Color.Blue, Color.Blue, Color.Blue],
                                                      [Color.Blue, Color.Blue, Color.Blue],
                                                      [Color.Blue, Color.Blue, Color.Blue]]);
      });
    });

    describe('moveUp', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Up));
        expect(side_colors(instance.front)).toEqual([ [Color.Orange, Color.Yellow, Color.Yellow],
                                                      [Color.Orange, Color.Yellow, Color.Yellow],
                                                      [Color.Orange, Color.Yellow, Color.Yellow]]);

        expect(side_colors(instance.top)).toEqual([[Color.Yellow, Color.Red, Color.Red],
                                                   [Color.Yellow, Color.Red, Color.Red],
                                                   [Color.Yellow, Color.Red, Color.Red]]);


        expect(side_colors(instance.back)).toEqual([  [Color.Red, Color.White, Color.White],
                                                      [Color.Red, Color.White, Color.White],
                                                      [Color.Red, Color.White, Color.White]]);

        expect(side_colors(instance.bottom)).toEqual([[Color.White, Color.Orange, Color.Orange],
                                                      [Color.White, Color.Orange, Color.Orange],
                                                      [Color.White, Color.Orange, Color.Orange]]);
      });
    });

    describe('moveRight', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Right));
        expect(side_colors(instance.front)).toEqual([ [Color.Green, Color.Green, Color.Green],
                                                      [Color.Yellow, Color.Yellow, Color.Yellow],
                                                      [Color.Yellow, Color.Yellow, Color.Yellow]]);

        expect(side_colors(instance.right)).toEqual([ [Color.Yellow, Color.Yellow, Color.Yellow],
                                                      [Color.Blue, Color.Blue, Color.Blue],
                                                      [Color.Blue, Color.Blue, Color.Blue]]);

        expect(side_colors(instance.back)).toEqual([  [Color.White, Color.White, Color.White],
                                                      [Color.White, Color.White, Color.White],
                                                      [Color.Blue, Color.Blue, Color.Blue]]);

        expect(side_colors(instance.left)).toEqual([  [Color.White, Color.White, Color.White],
                                                      [Color.Green, Color.Green, Color.Green],
                                                      [Color.Green, Color.Green, Color.Green]]);
      });
    });

    describe('moveLeft', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Left));
        expect(side_colors(instance.front)).toEqual([[Color.Blue, Color.Blue, Color.Blue],
                                                    [Color.Yellow, Color.Yellow, Color.Yellow],
                                                    [Color.Yellow, Color.Yellow, Color.Yellow]]);

        expect(side_colors(instance.left)).toEqual([[Color.Yellow, Color.Yellow, Color.Yellow],
                                                    [Color.Green, Color.Green, Color.Green],
                                                    [Color.Green, Color.Green, Color.Green]]);

        expect(side_colors(instance.back)).toEqual([[Color.White, Color.White, Color.White],
                                                    [Color.White, Color.White, Color.White],
                                                    [Color.Green, Color.Green, Color.Green]]);

        expect(side_colors(instance.right)).toEqual([[Color.White, Color.White, Color.White],
                                                     [Color.Blue, Color.Blue, Color.Blue],
                                                     [Color.Blue, Color.Blue, Color.Blue]]);
      });
    });

    describe('moveDown2', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Down2));
        expect(side_colors(instance.left)).toEqual([[Color.Red, Color.Green, Color.Green],
                                                    [Color.Red, Color.Green, Color.Green],
                                                    [Color.Red, Color.Green, Color.Green]]);
        expect(side_colors(instance.bottom)).toEqual([[Color.Orange, Color.Orange, Color.Orange],
                                                    [Color.Orange, Color.Orange, Color.Orange],
                                                    [Color.Green, Color.Green, Color.Green]]);
        expect(side_colors(instance.right)).toEqual([[Color.Blue, Color.Blue, Color.Orange],
                                                    [Color.Blue, Color.Blue, Color.Orange],
                                                    [Color.Blue, Color.Blue, Color.Orange]]);
        expect(side_colors(instance.top)).toEqual([[Color.Blue, Color.Blue, Color.Blue],
                                                    [Color.Red, Color.Red, Color.Red],
                                                    [Color.Red, Color.Red, Color.Red]]);
      });
    });

    describe('moveUp2', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Up2));
        expect(side_colors(instance.left)).toEqual([[Color.Orange, Color.Green, Color.Green],
                                                    [Color.Orange, Color.Green, Color.Green],
                                                    [Color.Orange, Color.Green, Color.Green]]);
        expect(side_colors(instance.bottom)).toEqual([[Color.Orange, Color.Orange, Color.Orange],
                                                    [Color.Orange, Color.Orange, Color.Orange],
                                                    [Color.Blue, Color.Blue, Color.Blue]]);
        expect(side_colors(instance.right)).toEqual([[Color.Blue, Color.Blue, Color.Red],
                                                    [Color.Blue, Color.Blue, Color.Red],
                                                    [Color.Blue, Color.Blue, Color.Red]]);
        expect(side_colors(instance.top)).toEqual([[Color.Green, Color.Green, Color.Green],
                                                    [Color.Red, Color.Red, Color.Red],
                                                    [Color.Red, Color.Red, Color.Red]]);
      });
    });

    describe('moveLeft, moveUp', () => {
      it('should have cube sides in the right place', () => {
        instance.move(new Move(0, Direction.Left));
        instance.front.selectCell(0, 0);
        instance.move(new Move(0, Direction.Up));
        expect(side_colors(instance.front)).toEqual([[Color.Orange, Color.Blue, Color.Blue],
                                                     [Color.Orange, Color.Yellow, Color.Yellow],
                                                     [Color.Orange, Color.Yellow, Color.Yellow]]);

        expect(side_colors(instance.left)).toEqual([[Color.Yellow, Color.Green, Color.Green],
                                                    [Color.Yellow, Color.Green, Color.Green],
                                                    [Color.Yellow, Color.Green, Color.Green]]);

        expect(side_colors(instance.back)).toEqual([[Color.Red, Color.White, Color.White],
                                                    [Color.Red, Color.White, Color.White],
                                                    [Color.Red, Color.Green, Color.Green]]);

        expect(side_colors(instance.right)).toEqual([[Color.White, Color.White, Color.White],
                                                     [Color.Blue, Color.Blue, Color.Blue],
                                                     [Color.Blue, Color.Blue, Color.Blue]]);
      });
    });
  });
});
