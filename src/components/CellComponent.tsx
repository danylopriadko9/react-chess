import React from 'react';
import { Cell } from '../models/Cell';

interface ICell {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: React.FC<ICell> = ({
  cell,
  selected,
  click,
}): JSX.Element => {
  return (
    <div
      className={`w-[80px] h-[80px] flex items-center justify-center ${cell.color} relative`}
      onClick={() => click(cell)}
    >
      <div
        className={`absolute top-0 right-0 left-0 bottom-0 opacity-50 flex items-center justify-center ${
          selected ? 'bg-green-900' : ''
        }  `}
      >
        {!cell.figure && cell.available && (
          <div
            className={`rounded-full w-[20px] h-[20px] bg-green-900 opacity-50`}
          />
        )}

        {cell.available && cell.figure && (
          <div
            className={`absolute top-0 right-0 left-0 bottom-0 opacity-50 bg-red-400`}
          />
        )}
      </div>
      {cell.figure?.logo && (
        <img className='w-[80px] h-[80px] z-10' src={cell.figure.logo} />
      )}
    </div>
  );
};

export default CellComponent;
