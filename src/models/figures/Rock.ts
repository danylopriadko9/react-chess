import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, figuresNames } from './Figure';
import blackLogo from '../../assets/black_rock.png';
import whiteLogo from '../../assets/white_rock.png';

export class Rock extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов родительского конструктора
    this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = figuresNames.ROCK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyVertical(target)) return true;

    return false;
  }
}
