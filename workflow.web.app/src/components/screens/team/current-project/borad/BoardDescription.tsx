import {FC} from 'react';
import {IBoard} from "../../../../../features/models/IBoard.ts";
import BoardDescriptionCount from "./BoardDescriptionCount.tsx";

interface BoardDescriptionProps {
    board: IBoard
}

const BoardDescription: FC<BoardDescriptionProps> = ({board}) => {
    return (
        <div className='board-description-container'>
            {board.description && <div className='board-description-text'>
                {board.description}
            </div>}

            <div className='board-description-count-container'>
                {board.columnsCount > 0 &&
                    <BoardDescriptionCount title='Колонок' count={board.columnsCount}/>
                }
                {board.objectivesCount > 0 &&
                    <BoardDescriptionCount title='Задач' count={board.objectivesCount}/>}
            </div>
        </div>
    );
};

export default BoardDescription;