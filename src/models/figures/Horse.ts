import { Figure, figuresNames } from './Figure';
import blackLogo from '../../assets/black_horse.png';
import whiteLogo from '../../assets/white_horse.png';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export class Horse extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов родительского конструктора
    this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = figuresNames.HORSE;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyCellsForHorse(target)) return true;

    return false;
  }
}
