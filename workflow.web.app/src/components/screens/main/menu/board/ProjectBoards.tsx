import {FC} from 'react';
import {useGetBoardByProjectQuery} from "../../../../../store/apis/boardApi.ts";
import {useTypedSelector} from "../../../../../store/hooks/hooks.ts";
import {IBoard} from "../../../../../features/models/IBoard.ts";
import BoardCard from "./BoardCard.tsx";
import {Row} from "antd";

const ProjectBoards: FC = () => {
    const selectedProjectIdRedux = useTypedSelector((state) => state.project?.selectedProjectId);

    const {data: boards} = useGetBoardByProjectQuery(selectedProjectIdRedux || 0, {
        skip: selectedProjectIdRedux === null
    });

    return (
        <div className='project-boards-container'>
            <b className='project-boards-header'>Доступные доски</b>
            <div className='project-boards'>
                <Row gutter={16}>
                    {boards && boards.map((board: IBoard) => (
                        <BoardCard key={board.boardId} board={board}></BoardCard>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProjectBoards;
