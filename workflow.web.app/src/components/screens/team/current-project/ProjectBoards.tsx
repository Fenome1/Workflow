import {FC} from 'react';
import {useGetBoardsByProjectQuery} from "../../../../store/apis/board/boardApi.ts";
import {IBoard} from "../../../../features/models/IBoard.ts";
import BoardCard from "./borad/BoardCard.tsx";
import './style.scss'
import CreateBoardButton from "./borad/CreateBoardButton.tsx";
import {Spin} from "antd";

interface ProjectBoardsProps {
    selectedProjectId: number | null
}

const ProjectBoards: FC<ProjectBoardsProps> = ({selectedProjectId}) => {
    const {data: boards, isLoading} = useGetBoardsByProjectQuery(selectedProjectId || 0, {
        skip: selectedProjectId === null
    });

    return (
        <div className='project-boards-container'>
            <b className='project-boards-header'>Доступные доски</b>
            <Spin spinning={isLoading}>
                <div className='project-boards'>
                    {boards && boards.map((board: IBoard) => (
                        <BoardCard key={board.boardId} board={board}></BoardCard>
                    ))}
                    <CreateBoardButton projectId={selectedProjectId ?? 0}/>
                </div>
            </Spin>
        </div>
    );
};

export default ProjectBoards;
