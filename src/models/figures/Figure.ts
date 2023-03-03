import logo from '../../assets/black_horse.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum figuresNames {
  FIGURE = 'Figure',
  KING = 'King',
  PAWN = 'Pawn',
  QUEEN = 'Queen',
  HORSE = 'Horse',
  BISHOP = 'Bishop',
  ROCK = 'Rock',
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: figuresNames;
  id: number;
  firstMove: boolean | null;

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false;
    // if (target.figure?.name === figuresNames.KING) return false;

    return true;
  }

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.id = Math.random();
    this.cell.figure = this;
    this.logo = null;
    this.name = figuresNames.FIGURE;
    this.firstMove = null;
  }
}
