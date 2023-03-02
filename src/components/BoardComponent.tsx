import React from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';

interface IBoardComponent {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<IBoardComponent> = ({
  board,
  setBoard,
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
