import React from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import SelectPopup from './components/SelectPopup';
import { Board } from './models/Board';
import { Cell } from './models/Cell';

interface ISelectPopup {
  cell: Cell | null;
  bool: boolean;
}

const App: React.FC = (): JSX.Element => {
  const [board, setBoard] = React.useState<Board>(new Board());
  const [selectPopupStatus, setSelectPopupStatus] =
    React.useState<ISelectPopup | null>({ cell: null, bool: false });

  React.useEffect(() => {
    restartGame();
  }, []);

  React.useEffect(() => {
    console.log(selectPopupStatus);
  }, [selectPopupStatus]);

  const restartGame = () => {
    const newBoard = new Board();
    newBoard.initialCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  return (
    <div className='flex w-screen h-screen items-center justify-center bg-slate-900 relative'>
      {selectPopupStatus?.bool && (
        <SelectPopup
          cell={selectPopupStatus.cell}
          setSelectPopupStatus={setSelectPopupStatus}
        />
      )}
      <BoardComponent
        board={board}
        setBoard={setBoard}
        setSelectPopupStatus={setSelectPopupStatus}
      />
    </div>
  );
};

export default App;
