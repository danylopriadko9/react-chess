import { Figure, figuresNames } from './Figure';
import blackLogo from '../../assets/black_pawn.png';
import whiteLogo from '../../assets/white_pawn.png';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export class Pawn extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов родительского конструктора
    this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = figuresNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.pawnMove(target)) return true;
    if (this.cell.takeOnThePass(target)) return true;

    return false;
  }
}
