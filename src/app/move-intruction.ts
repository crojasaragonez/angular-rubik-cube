import { Direction } from './enums/direction.enum';

export interface MoveIntruction {
  start_with: string;
  direction: Direction;
  moves: any[];
}
