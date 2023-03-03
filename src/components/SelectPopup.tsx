import React from 'react';
import { Cell } from '../models/Cell';
import whiteBishop from '../assets/white_bishop.png';
import blackBishop from '../assets/black_bishop.png';
import blackHorse from '../assets/black_horse.png';
import whiteHorse from '../assets/white_horse.png';
import blackRock from '../assets/black_rock.png';
import whitekRock from '../assets/white_rock.png';
import blackQueen from '../assets/black_queen.png';
import whiteQueen from '../assets/white_queen.svg.png';
import { Colors } from '../models/Colors';
import { Figure, figuresNames } from '../models/figures/Figure';
import { Bishop } from '../models/figures/Bishop';
import { Horse } from '../models/figures/Horse';
import { Rock } from '../models/figures/Rock';
import { Queen } from '../models/figures/Queen';

interface ISelectPopup {
  cell: Cell | null;
  bool: boolean;
}

interface ISelectPopupProps {
  cell: Cell | null;
  setSelectPopupStatus: (x: ISelectPopup) => void;
}

interface IVariants {
  logo: string;
  name: figuresNames;
}

const whiteFigures: IVariants[] = [
  {
    logo: whiteBishop,
    name: figuresNames.BISHOP,
  },
  {
    logo: whiteHorse,
    name: figuresNames.HORSE,
  },
  {
    logo: whitekRock,
    name: figuresNames.ROCK,
  },
  {
    logo: whiteQueen,
    name: figuresNames.QUEEN,
  },
];
const blackFigures: IVariants[] = [
  {
    logo: blackBishop,
    name: figuresNames.BISHOP,
  },
  {
    logo: blackHorse,
    name: figuresNames.HORSE,
  },
  {
    logo: blackRock,
    name: figuresNames.ROCK,
  },
  {
    logo: blackQueen,
    name: figuresNames.QUEEN,
  },
];

const SelectPopup: React.FC<ISelectPopupProps> = ({
  cell,
  setSelectPopupStatus,
}): JSX.Element => {
  const [variants, setVariants] = React.useState<IVariants[]>([]);

  React.useEffect(() => {
    if (cell?.figure?.color === Colors.WHITE) {
      setVariants(whiteFigures);
    } else setVariants(blackFigures);
  }, []);

  const selectFigure = (name: figuresNames) => {
    const color = cell?.figure?.color;

    if (cell && color) {
      if (name === figuresNames.BISHOP) {
        cell.figure = new Bishop(color, cell);
      } else if (name === figuresNames.HORSE) {
        cell.figure = new Horse(color, cell);
      } else if (name === figuresNames.ROCK) {
        cell.figure = new Rock(color, cell);
      } else if (name === figuresNames.QUEEN) {
        cell.figure = new Queen(color, cell);
      }
    }

    setSelectPopupStatus({ cell: null, bool: false });
  };

  return (
    <div className='absolute flex items-center justify-center bg-black/[.5] z-50 top-0 right-0 bottom-0 left-0'>
      <div className=' w-[500px] h-[100px] bg-white rounded-md flex justify-around items-center'>
        {variants.map((el) => (
          <img
            className='w-[80px] h-[80px]'
            key={Math.random()}
            src={el.logo}
            alt=''
            onClick={() => selectFigure(el.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectPopup;
