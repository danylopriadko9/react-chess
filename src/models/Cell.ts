import { Colors } from './Colors';
import { Figure, figuresNames } from './figures/Figure';
import { Board } from './Board';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // Можешь ли переместиться
  id: number; // Для реакт ключей

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false;

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    // разница модулей по обеем осям всегда будет 1 либо -1 т е модули разницы всегда будут равны 1
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }

    return true;
  }

  isEmptyCellsForHorse(target: Cell) {
    if (target.x === this.x) return false;
    if (target.y === this.y) return false;

    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX === absY) return false;
    if (absX > 2 || absY > 2) return false;

    return true;
  }

  takeOnThePass(target: Cell) {
    if (this.figure?.color === Colors.WHITE) {
      if (
        (target.x === this.x + 1 && target.y === this.y - 1) ||
        (target.x === this.x - 1 && target.y === this.y - 1)
      ) {
        const figureCheck = this.board.getCell(target.x, target.y + 1).figure;
        if (
          figureCheck?.name === figuresNames.PAWN &&
          figureCheck?.color !== this.figure?.color &&
          figureCheck?.firstMove === true
        )
          return true;
      }
    }

    if (this.figure?.color === Colors.BLACK) {
      if (
        (target.x === this.x + 1 && target.y === this.y + 1) ||
        (target.x === this.x - 1 && target.y === this.y + 1)
      ) {
        const figureCheck = this.board.getCell(target.x, target.y - 1).figure;
        if (
          figureCheck?.name === figuresNames.PAWN &&
          figureCheck?.color !== this.figure?.color &&
          figureCheck?.firstMove === true
        )
          return true;
      }
    }

    return false;
  }

  pawnMove(target: Cell) {
    // двигаться на соседние столбики нельзя
    if (target.x === this.x && target.figure) return false;

    if (this.figure?.color === Colors.WHITE) {
      // двигаться назад нельзя
      if (target.y >= this.y) return false;

      // если первый ход то можно на две клеточки
      if (!(target.y + 2 >= this.y) && this.figure.firstMove === null)
        return false;

      // если не первый ход то только на одну
      if (!(target.y + 1 >= this.y) && this.figure.firstMove !== null)
        return false;

      // бить можно только фигуры на тех клеточках чьи x отличаються на один
      if (
        (target.x + 1 === this.x && target.y + 1 === this.y && target.figure) ||
        (target.x - 1 === this.x && target.y + 1 === this.y && target.figure)
      )
        return true;
    }

    if (this.figure?.color === Colors.BLACK) {
      // двигаться назад нельзя
      if (target.y <= this.y) return false;

      // если первый ход то можно на две клеточки
      if (!(target.y - 2 <= this.y) && this.figure.firstMove === null)
        return false;

      // если не первый ход то только на одну
      if (!(target.y - 1 <= this.y) && this.figure.firstMove !== null)
        return false;

      // бить можно только фигуры на тех клеточках чьи x отличаються на один
      if (
        (target.x + 1 === this.x && target.y - 1 === this.y && target.figure) ||
        (target.x - 1 === this.x && target.y - 1 === this.y && target.figure)
      )
        return true;
    }

    if (target.x !== this.x) return false;
    return true;
  }

  isPawnCanAtackThisCell(target: Cell, pawn: Figure): boolean {
    if (target.x === pawn.cell.x) return false;

    if (pawn.color === Colors.BLACK) {
      if (
        target.y === pawn.cell.y + 1 &&
        (target.x === pawn.cell.x + 1 || target.x === pawn.cell.x - 1)
      ) {
        return true;
      }
    }

    if (pawn.color === Colors.WHITE) {
      if (
        target.y === pawn.cell.y - 1 &&
        (target.x === pawn.cell.x + 1 || target.x === pawn.cell.x - 1)
      ) {
        return true;
      }
    }

    return false;
  }

  cellsUnderAtack(figures: Figure[], target: Cell): boolean {
    for (const figure of figures) {
      if (figure.name !== figuresNames.PAWN && figure.canMove(target))
        return true;

      if (
        figure.name === figuresNames.PAWN &&
        this.isPawnCanAtackThisCell(target, figure)
      )
        return true;
    }

    return false;
  }

  kingMove(target: Cell) {
    const absY = Math.abs(target.y - this.y);
    const absX = Math.abs(target.x - this.x);

    if (absY <= 1 && absX <= 1) {
      const enemiesArr: Cell[][] = this.board.cells.map((row) =>
        row.filter(
          (cell: Cell) =>
            cell.figure &&
            this.figure &&
            cell.figure.color !== this.figure.color
        )
      );

      const enemies: Figure[] = ([] as Cell[])
        .concat(...enemiesArr)
        .map((el) => el.figure as Figure);

      if (this.cellsUnderAtack(enemies, target)) return true;

      return false;
    }

    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  deleteFigureFromCell(x: number, y: number) {
    this.board.getCell(x, y).figure = null;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      //ВЗЯТИЕ НА ПРОХОДЕ
      // проверяем ходит ли это пешка
      if (this.figure.name === figuresNames.PAWN) {
        // если иксы не совпадают и пешка ходит на пустое поле - значит это взятие на проходе
        if (this.x !== target.x && !target.figure) {
          // в зависимости от цвета удаляем с нужного поля фигуру
          if (this.figure.color === Colors.WHITE)
            this.deleteFigureFromCell(target.x, target.y + 1);
          else this.deleteFigureFromCell(target.x, target.y - 1);
        }
      }

      if (target.figure) {
        console.log(target.figure);
        //this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.deleteFigureFromCell(this.x, this.y);
    }
  }
}
