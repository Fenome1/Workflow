import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import {useGetColumnsByBoardQuery} from "../../../../store/apis/columnApi.ts";
import ColumnCard from "../menu/column/ColumnCard.tsx";

const CurrentBoard = () => {
    const selectedBoardId = useTypedSelector((state) => state.board?.selectedBoardId);

    const {data: columns} = useGetColumnsByBoardQuery(selectedBoardId || 0,
        {skip: selectedBoardId === null});

    return (
        <div>
            {columns && columns.length < 1 &&
                <b>Колонки не найдены</b>
            }
            {columns && columns?.map((column) => (
                <ColumnCard key={column.columnId} column={column}/>
            ))}
        </div>
    );
};

export default CurrentBoard;