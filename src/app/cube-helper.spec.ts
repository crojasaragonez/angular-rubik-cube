import { CubeHelper } from './cube-helper';

describe('CubeHelper', () => {
  describe('oppositeIndex', () => {
    it('should return the inverse each value', () => {
      expect(CubeHelper.oppositeIndex(0)).toEqual(2);
      expect(CubeHelper.oppositeIndex(1)).toEqual(1);
      expect(CubeHelper.oppositeIndex(2)).toEqual(0);
    });
  });

  describe('indexIterator', () => {
    it('should execute the given action 3 times', () => {
      spyOn(console, 'log');
      CubeHelper.indexIterator(index => { console.log(index); });
      expect(console.log).toHaveBeenCalledTimes(3);
    });
  });
});
