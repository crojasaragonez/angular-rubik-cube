import { Cube } from './cube';
import { Side } from './side';
import { Move } from './move';
import { Location } from './location';
import { Cell } from './cell';
import { SidePosition } from './enums/side-position.enum';

describe('Cube', () => {
  const instance = new Cube();
  const selected_side = new Side('yellow', SidePosition.Front);
  selected_side.selectCell(0, 0);

  describe('reset', () => {
    it('should reset default attributes in the cube', () => {
      instance.reset();
      expect(instance['top']).toEqual( new Side('red', SidePosition.Top));
      expect(instance['bottom']).toEqual(new Side('orange', SidePosition.Bottom));
      expect(instance['left']).toEqual(new Side('green', SidePosition.Left));
      expect(instance['right']).toEqual(new Side('blue', SidePosition.Right));
      expect(instance['back']).toEqual(new Side('white', SidePosition.Back));
      expect(instance['front']).toEqual(selected_side);
      expect(instance['rotateX']).toEqual(-18);
      expect(instance['rotateY']).toEqual(36);
      expect(instance['history']).toEqual([]);
    });
  });

  describe('findSelection', () =>  {
    it('should find the current selected position', () => {
      expect(instance.findSelection()).toEqual(selected_side);
    });
  });

  describe('resetSelection', () => {
    it('should reset the current selected position', () => {
      instance.resetSelection();
      expect(instance.findSelection()).toEqual(undefined);
    });
  });

  describe('undo', () => {

    beforeEach(() => {
      instance.reset();
    });

    it('should revert moveDown', () => {
      spyOn(instance, 'moveUp');
      instance.moveDown(0);
      instance.undo();
      expect(instance.moveUp).toHaveBeenCalledWith(0, false);
    });

    it('should revert moveDown2', () => {
      spyOn(instance, 'moveUp2');
      instance.moveDown2(0);
      instance.undo();
      expect(instance.moveUp2).toHaveBeenCalledWith(0, false);
    });

    it('should revert moveUp', () => {
      spyOn(instance, 'moveDown');
      instance.moveUp(0);
      instance.undo();
      expect(instance.moveDown).toHaveBeenCalledWith(0, false);
    });

    it('should revert moveUp2', () => {
      spyOn(instance, 'moveDown2');
      instance.moveUp2(0);
      instance.undo();
      expect(instance.moveDown2).toHaveBeenCalledWith(0, false);
    });

    it('should revert moveRight', () => {
      spyOn(instance, 'moveLeft');
      instance.moveRight(0);
      instance.undo();
      expect(instance.moveLeft).toHaveBeenCalledWith(0, false);
    });

    it('should revert moveLeft', () => {
      spyOn(instance, 'moveRight');
      instance.moveLeft(0);
      instance.undo();
      expect(instance.moveRight).toHaveBeenCalledWith(0, false);
    });

    it('should keep history consistent', () => {
      instance.moveLeft(0);
      instance.moveRight(0);
      instance.moveUp(0);
      instance.moveDown(0);
      expect(instance['history'].length).toEqual(4);
    });

    it('should remove last item in history after a revert', () => {
      instance.moveLeft(0);
      instance.moveRight(0);
      instance.moveUp(0);
      instance.moveDown(0);
      instance.undo();
      expect(instance['history'].length).toEqual(3);
    });
  });

  describe('moveDown', () => {
    it('should rotate left side of the cube when column is 0', () => {
      spyOn(instance['left'], 'rotateLeft');
      instance.moveDown(0);
      expect(instance['left'].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate right side of the cube when column is 2', () => {
      spyOn(instance['right'], 'rotateRight');
      instance.moveDown(2);
      expect(instance['right'].rotateRight).toHaveBeenCalled();
    });
  });

    describe('moveDown2', () => {
    it('should rotate back side of the cube when column is 0', () => {
      spyOn(instance['back'], 'rotateLeft');
      instance.moveDown2(0);
      expect(instance['back'].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate front side of the cube when column is 2', () => {
      spyOn(instance['front'], 'rotateRight');
      instance.moveDown2(2);
      expect(instance['front'].rotateRight).toHaveBeenCalled();
    });
  });

  describe('moveUp', () => {
    it('should rotate left side of the cube when column is 0', () => {
      spyOn(instance['left'], 'rotateRight');
      instance.moveUp(0);
      expect(instance['left'].rotateRight).toHaveBeenCalled();
    });
    it('should rotate right side of the cube when column is 2', () => {
      spyOn(instance['right'], 'rotateLeft');
      instance.moveUp(2);
      expect(instance['right'].rotateLeft).toHaveBeenCalled();
    });
  });

  describe('moveRight', () => {
    it('should rotate top side of the cube when column is 0', () => {
      spyOn(instance['top'], 'rotateRight');
      instance.moveRight(0);
      expect(instance['top'].rotateRight).toHaveBeenCalled();
    });
    it('should rotate bottom side of the cube when column is 2', () => {
      spyOn(instance['bottom'], 'rotateLeft');
      instance.moveRight(2);
      expect(instance['bottom'].rotateLeft).toHaveBeenCalled();
    });
  });

  describe('moveLeft', () => {
    it('should rotate top side of the cube when column is 0', () => {
      spyOn(instance['top'], 'rotateLeft');
      instance.moveLeft(0);
      expect(instance['top'].rotateLeft).toHaveBeenCalled();
    });
    it('should rotate bottom side of the cube when column is 2', () => {
      spyOn(instance['bottom'], 'rotateRight');
      instance.moveLeft(2);
      expect(instance['bottom'].rotateRight).toHaveBeenCalled();
    });
  });

  describe('corner consistency', () => {
    beforeEach(() => {
      instance.reset();
    });
    describe('red, yellow, green', () => {
      it('should have the right colors', () => {
        expect(instance.front.cells[0][0].color).toEqual('yellow');
        expect(instance.left.cells[0][2].color).toEqual('green');
        expect(instance.top.cells[2][0].color).toEqual('red');
      });

      it('should have the right text', () => {
        expect(instance.front.cells[0][0].text).toEqual('1');
        expect(instance.left.cells[0][2].text).toEqual('3');
        expect(instance.top.cells[2][0].text).toEqual('7');
      });
    });

    describe('red, blue, yellow', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[2][2].color).toEqual('red');
        expect(instance.right.cells[0][0].color).toEqual('blue');
        expect(instance.front.cells[0][2].color).toEqual('yellow');
      });

      it('should have the right text', () => {
        expect(instance.top.cells[2][2].text).toEqual('9');
        expect(instance.right.cells[0][0].text).toEqual('1');
        expect(instance.front.cells[0][2].text).toEqual('3');
      });
    });

    describe('red, white, blue', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[0][2].color).toEqual('red');
        expect(instance.back.cells[2][2].color).toEqual('white');
        expect(instance.right.cells[0][2].color).toEqual('blue');
      });

      it('should have the right text', () => {
        expect(instance.top.cells[0][2].text).toEqual('3');
        expect(instance.back.cells[2][2].text).toEqual('9');
        expect(instance.right.cells[0][2].text).toEqual('3');
      });
    });

    describe('red, green, white', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[0][0].color).toEqual('red');
        expect(instance.left.cells[0][0].color).toEqual('green');
        expect(instance.back.cells[2][0].color).toEqual('white');
      });

      it('should have the right text', () => {
        expect(instance.top.cells[0][0].text).toEqual('1');
        expect(instance.left.cells[0][0].text).toEqual('1');
        expect(instance.back.cells[2][0].text).toEqual('7');
      });
    });

    describe('red, yellow, green', () => {
      it('should have the right colors', () => {
        expect(instance.top.cells[2][0].color).toEqual('red');
        expect(instance.front.cells[0][0].color).toEqual('yellow');
        expect(instance.left.cells[0][2].color).toEqual('green');
      });

      it('should have the right text', () => {
        expect(instance.top.cells[2][0].text).toEqual('7');
        expect(instance.front.cells[0][0].text).toEqual('1');
        expect(instance.left.cells[0][2].text).toEqual('3');
      });
    });

    //////////////////////////////////////////////////////////

    describe('orange, green, yellow', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[0][0].color).toEqual('orange');
        expect(instance.left.cells[2][2].color).toEqual('green');
        expect(instance.front.cells[2][0].color).toEqual('yellow');
      });

      it('should have the right text', () => {
        expect(instance.bottom.cells[0][0].text).toEqual('1');
        expect(instance.left.cells[2][2].text).toEqual('9');
        expect(instance.front.cells[2][0].text).toEqual('7');
      });
    });

    describe('orange, white, green', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[2][0].color).toEqual('orange');
        expect(instance.back.cells[0][0].color).toEqual('white');
        expect(instance.left.cells[2][0].color).toEqual('green');
      });

      it('should have the right text', () => {
        expect(instance.bottom.cells[2][0].text).toEqual('7');
        expect(instance.back.cells[0][0].text).toEqual('1');
        expect(instance.left.cells[2][0].text).toEqual('7');
      });
    });

    describe('orange, blue, white', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[2][2].color).toEqual('orange');
        expect(instance.right.cells[2][2].color).toEqual('blue');
        expect(instance.back.cells[0][2].color).toEqual('white');
      });

      it('should have the right text', () => {
        expect(instance.bottom.cells[2][2].text).toEqual('9');
        expect(instance.right.cells[2][2].text).toEqual('9');
        expect(instance.back.cells[0][2].text).toEqual('3');
      });
    });

    describe('orange, yellow, blue', () => {
      it('should have the right colors', () => {
        expect(instance.bottom.cells[0][2].color).toEqual('orange');
        expect(instance.front.cells[2][2].color).toEqual('yellow');
        expect(instance.right.cells[2][0].color).toEqual('blue');
      });

      it('should have the right text', () => {
        expect(instance.bottom.cells[0][2].text).toEqual('3');
        expect(instance.front.cells[2][2].text).toEqual('9');
        expect(instance.right.cells[2][0].text).toEqual('7');
      });
    });
  });

  describe('cell consistency after some moves', () => {
    beforeEach(() => {
      instance.reset();
    });

    const side_colors = (side: Side) => {
      return side.cells.map(c => c.map(e => e.color));
    };

    describe('moveDown', () => {
      it('should have cube sides in the right place', () => {
        instance.moveDown(0);
        expect(side_colors(instance.front)).toEqual([ ['red', 'yellow', 'yellow'],
                                                      ['red', 'yellow', 'yellow'],
                                                      ['red', 'yellow', 'yellow']]);

        expect(side_colors(instance.bottom)).toEqual([['yellow', 'orange', 'orange'],
                                                      ['yellow', 'orange', 'orange'],
                                                      ['yellow', 'orange', 'orange']]);

        expect(side_colors(instance.back)).toEqual([  ['orange', 'white', 'white'],
                                                      ['orange', 'white', 'white'],
                                                      ['orange', 'white', 'white']]);

        expect(side_colors(instance.top)).toEqual([   ['white', 'red', 'red'],
                                                      ['white', 'red', 'red'],
                                                      ['white', 'red', 'red']]);

        expect(side_colors(instance.left)).toEqual([  ['green', 'green', 'green'],
                                                      ['green', 'green', 'green'],
                                                      ['green', 'green', 'green']]);

        expect(side_colors(instance.right)).toEqual([ ['blue', 'blue', 'blue'],
                                                      ['blue', 'blue', 'blue'],
                                                      ['blue', 'blue', 'blue']]);
      });
    });

    describe('moveUp', () => {
      it('should have cube sides in the right place', () => {
        instance.moveUp(0);
        expect(side_colors(instance.front)).toEqual([ ['orange', 'yellow', 'yellow'],
                                                      ['orange', 'yellow', 'yellow'],
                                                      ['orange', 'yellow', 'yellow']]);

        expect(side_colors(instance.top)).toEqual([['yellow', 'red', 'red'],
                                                   ['yellow', 'red', 'red'],
                                                   ['yellow', 'red', 'red']]);


        expect(side_colors(instance.back)).toEqual([  ['red', 'white', 'white'],
                                                      ['red', 'white', 'white'],
                                                      ['red', 'white', 'white']]);

        expect(side_colors(instance.bottom)).toEqual([['white', 'orange', 'orange'],
                                                      ['white', 'orange', 'orange'],
                                                      ['white', 'orange', 'orange']]);
      });
    });

    describe('moveRight', () => {
      it('should have cube sides in the right place', () => {
        instance.moveRight(0);
        expect(side_colors(instance.front)).toEqual([ ['green', 'green', 'green'],
                                                      ['yellow', 'yellow', 'yellow'],
                                                      ['yellow', 'yellow', 'yellow']]);

        expect(side_colors(instance.right)).toEqual([ ['yellow', 'yellow', 'yellow'],
                                                      ['blue', 'blue', 'blue'],
                                                      ['blue', 'blue', 'blue']]);

        expect(side_colors(instance.back)).toEqual([  ['white', 'white', 'white'],
                                                      ['white', 'white', 'white'],
                                                      ['blue', 'blue', 'blue']]);

        expect(side_colors(instance.left)).toEqual([  ['white', 'white', 'white'],
                                                      ['green', 'green', 'green'],
                                                      ['green', 'green', 'green']]);
      });
    });

    describe('moveLeft', () => {
      it('should have cube sides in the right place', () => {
        instance.moveLeft(0);
        expect(side_colors(instance.front)).toEqual([['blue', 'blue', 'blue'],
                                                    ['yellow', 'yellow', 'yellow'],
                                                    ['yellow', 'yellow', 'yellow']]);

        expect(side_colors(instance.left)).toEqual([['yellow', 'yellow', 'yellow'],
                                                    ['green', 'green', 'green'],
                                                    ['green', 'green', 'green']]);

        expect(side_colors(instance.back)).toEqual([['white', 'white', 'white'],
                                                    ['white', 'white', 'white'],
                                                    ['green', 'green', 'green']]);

        expect(side_colors(instance.right)).toEqual([['white', 'white', 'white'],
                                                     ['blue', 'blue', 'blue'],
                                                     ['blue', 'blue', 'blue']]);
      });
    });

    describe('moveDown2', () => {
      it('should have cube sides in the right place', () => {
        instance.moveDown2(0);
        expect(side_colors(instance.left)).toEqual([['red', 'green', 'green'],
                                                    ['red', 'green', 'green'],
                                                    ['red', 'green', 'green']]);
        expect(side_colors(instance.bottom)).toEqual([['orange', 'orange', 'orange'],
                                                    ['orange', 'orange', 'orange'],
                                                    ['green', 'green', 'green']]);
        expect(side_colors(instance.right)).toEqual([['blue', 'blue', 'orange'],
                                                    ['blue', 'blue', 'orange'],
                                                    ['blue', 'blue', 'orange']]);
        expect(side_colors(instance.top)).toEqual([['blue', 'blue', 'blue'],
                                                    ['red', 'red', 'red'],
                                                    ['red', 'red', 'red']]);
      });
    });

    describe('moveUp2', () => {
      it('should have cube sides in the right place', () => {
        instance.moveUp2(0);
        expect(side_colors(instance.left)).toEqual([['orange', 'green', 'green'],
                                                    ['orange', 'green', 'green'],
                                                    ['orange', 'green', 'green']]);
        expect(side_colors(instance.bottom)).toEqual([['orange', 'orange', 'orange'],
                                                    ['orange', 'orange', 'orange'],
                                                    ['blue', 'blue', 'blue']]);
        expect(side_colors(instance.right)).toEqual([['blue', 'blue', 'red'],
                                                    ['blue', 'blue', 'red'],
                                                    ['blue', 'blue', 'red']]);
        expect(side_colors(instance.top)).toEqual([['green', 'green', 'green'],
                                                    ['red', 'red', 'red'],
                                                    ['red', 'red', 'red']]);
      });
    });

    describe('moveLeft, moveUp', () => {
      it('should have cube sides in the right place', () => {
        instance.moveLeft(0);
        instance.front.selectCell(0, 0);
        instance.moveUp(0);
        expect(side_colors(instance.front)).toEqual([['orange', 'blue', 'blue'],
                                                     ['orange', 'yellow', 'yellow'],
                                                     ['orange', 'yellow', 'yellow']]);

        expect(side_colors(instance.left)).toEqual([['yellow', 'green', 'green'],
                                                    ['yellow', 'green', 'green'],
                                                    ['yellow', 'green', 'green']]);

        expect(side_colors(instance.back)).toEqual([['red', 'white', 'white'],
                                                    ['red', 'white', 'white'],
                                                    ['red', 'green', 'green']]);

        expect(side_colors(instance.right)).toEqual([['white', 'white', 'white'],
                                                     ['blue', 'blue', 'blue'],
                                                     ['blue', 'blue', 'blue']]);
      });
    });
  });
});
