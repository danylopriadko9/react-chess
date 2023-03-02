import React from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';

const App: React.FC = (): JSX.Element => {
  const [board, setBoard] = React.useState<Board>(new Board());

  React.useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const newBoard = new Board();
    newBoard.initialCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  return (
    <div className='flex w-screen h-screen items-center justify-center bg-slate-900'>
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
};

export default App;
