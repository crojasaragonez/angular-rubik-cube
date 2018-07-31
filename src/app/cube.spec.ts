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

  describe('cell consistency after some moves', () => {
    beforeEach(() => {
      instance.reset();
    });

    it('should have the right cells in the right place', () => {
      instance.moveDown(0);
      [0, 1, 2].forEach(i => {
        expect(instance.front.cells[i][0].color).toEqual('red');
        expect(instance.bottom.cells[i][0].color).toEqual('yellow');
        expect(instance.back.cells[i][0].color).toEqual('orange');
        expect(instance.top.cells[i][0].color).toEqual('white');
      });
      instance.front.selectCell(0, 0);
      instance.moveRight(0);
      expect(instance.front.cells[0].map((e) => e.color)).toEqual(['green', 'green', 'green']);
      expect(instance.right.cells[0].map((e) => e.color)).toEqual(['red', 'yellow', 'yellow']);
      expect(instance.back.cells[0].map((e) => e.color)).toEqual(['blue', 'blue', 'blue']);
      // expect(instance.left.cells[0].map((e) => e.color)).toEqual(['white', 'white', 'orange']);
    });
  });
});
