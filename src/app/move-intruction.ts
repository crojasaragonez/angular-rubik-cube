import { Direction } from './enums';

export interface MoveIntruction {
  start_with: string;
  end_with?: string;
  direction: Direction;
  moves?: any[];
}
