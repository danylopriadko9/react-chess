import React from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { figuresNames } from '../models/figures/Figure';
import CellComponent from './CellComponent';

interface ISelectPopup {
  cell: Cell;
  bool: boolean;
}

interface IBoardComponent {
  board: Board;
  setBoard: (board: Board) => void;
  setSelectPopupStatus: (x: ISelectPopup) => void;
}

const BoardComponent: React.FC<IBoardComponent> = ({
  board,
  setBoard,
  setSelectPopupStatus,
}): JSX.Element => {
  const [selectedCell, setSelecterCell] = React.useState<Cell | null>(null);

  const handleSelectCell = (cell: Cell) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);

      if (cell.figure) {
        if (cell.figure.firstMove === null) cell.figure.firstMove = true;
        else cell.figure.firstMove = false;
      }

      // ПРЕВРАЩЕНИЕ ПЕШКИ
      if (cell.figure?.name === figuresNames.PAWN) {
        if (cell.y === 0 || cell.y === 7) {
          console.log('Превращение');
          setSelectPopupStatus({ bool: true, cell: cell });
        }
      }

      setSelecterCell(null);
      updateBoard();
    } else {
      setSelecterCell(cell);
    }
  };

  React.useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard: Board = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <div className='w-[640px] h-[640px] flex flex-wrap'>
      {board.cells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((cell, j) => (
            <CellComponent
              click={handleSelectCell}
              key={cell.id}
              cell={cell}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
