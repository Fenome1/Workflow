import {FC} from 'react';
import {useGetBoardsByProjectQuery} from "../../../../store/apis/boardApi.ts";
import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import {IBoard} from "../../../../features/models/IBoard.ts";
import BoardCard from "./borad/BoardCard.tsx";
import './style.scss'
import CreateBoardButton from "./borad/CreateBoardButton.tsx";

const ProjectBoards: FC = () => {
    const selectedProjectIdRedux = useTypedSelector((state) => state.project?.selectedProjectId);

    const {data: boards} = useGetBoardsByProjectQuery(selectedProjectIdRedux || 0, {
        skip: selectedProjectIdRedux === null
    });

    return (
        <div className='project-boards-container'>
            <b className='project-boards-header'>Доступные доски</b>
            <div className='project-boards'>
                {boards && boards.map((board: IBoard) => (
                    <BoardCard key={board.boardId} board={board}></BoardCard>
                ))}
                <CreateBoardButton projectId={selectedProjectIdRedux ?? 0}/>
            </div>
        </div>
    );
};

export default ProjectBoards;
