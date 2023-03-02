import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, figuresNames } from './Figure';
import blackLogo from '../../assets/black_king.svg.png';
import whiteLogo from '../../assets/white_king.svg.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов родительского конструктора
    this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = figuresNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.kingMove(target)) return false;

    return true;
  }
}
