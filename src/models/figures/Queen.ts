import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, figuresNames } from './Figure';
import blackLogo from '../../assets/black_queen.png';
import whiteLogo from '../../assets/white_queen.svg.png';

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов родительского конструктора
    this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = figuresNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
