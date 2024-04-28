import {FC} from 'react';
import {IBoard} from "../../../../../features/models/IBoard.ts";
import {Card} from 'antd';
import "../../style.scss"
import {useNavigate} from "react-router-dom";
import {selectBoard} from "../../../../../store/slices/boardSlice.ts";
import {useAppDispatch} from "../../../../../store/hooks/hooks.ts";
import '../style.scss'
import BoardDescription from "./BoardDescription.tsx";
import EllipsisBoardDropDown from "./EllipsisBoardDropDown.tsx";

interface BoardCardProps {
    board: IBoard
}

const BoardCard: FC<BoardCardProps> = ({board}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toCurrentBoard = () => navigate("/current-board")

    const handleBoardClick = async () => {
        await dispatch(selectBoard(board.boardId));
        toCurrentBoard()
    };

    const handleEllipsisMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Card
            onClick={handleBoardClick}
            className='board-card'
            hoverable
            bordered={true}
            key={board.boardId}>
            <div className='board-card-header'>
                 <span className='board-card-title'>
                {board.name}
                </span>
                <EllipsisBoardDropDown onClick={handleEllipsisMenuClick} board={board}/>
            </div>
            <BoardDescription board={board}/>
        </Card>
    );
};

export default BoardCard;