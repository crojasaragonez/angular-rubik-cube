import { Direction, SidePosition } from './enums';

export interface MoveIntruction {
  start_with: SidePosition;
  end_with?: SidePosition;
  direction: Direction;
  moves?: any[];
}
