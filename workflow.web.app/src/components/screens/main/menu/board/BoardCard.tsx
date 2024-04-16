import {FC} from 'react';
import {IBoard} from "../../../../../features/models/IBoard.ts";
import {Card, Col} from 'antd';
import "../../style.scss"
import {useNavigate} from "react-router-dom";
import {selectBoard} from "../../../../../store/slices/boardSlice.ts";
import {useAppDispatch} from "../../../../../store/hooks/hooks.ts";

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

    return (
        <Col key={board.boardId} span={8}>
            <Card onClick={handleBoardClick} className='board-card' hoverable bordered={true} key={board.boardId}
                  title={board.name}>
            </Card>
        </Col>
    );
};

export default BoardCard;