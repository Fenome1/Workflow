import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {useGetColumnsByBoardQuery} from "../../../store/apis/columnApi.ts";
import ColumnCard from "../../cards/ColumnCard.tsx";
import './style.scss'

const CurrentBoard = () => {
    const selectedBoardId = useTypedSelector((state) => state.board?.selectedBoardId);

    const {data: columns} = useGetColumnsByBoardQuery(selectedBoardId || 0,
        {skip: selectedBoardId === null});

    return (
        <div className='board-column-container'>
            <b className='board-column-header'>Доступные колонки</b>
            <div className='board-columns'>
                {columns && columns?.map((column) => (
                    <ColumnCard key={column.columnId} column={column}/>
                ))}
            </div>
        </div>
    );
};

export default CurrentBoard;