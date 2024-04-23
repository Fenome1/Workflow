import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import {useGetColumnsByBoardQuery} from "../../../../store/apis/columnApi.ts";
import ColumnCard from "./ColumnCard.tsx";
import './style.scss'
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import CreateColumn from "./create/CreateColumn.tsx";
import {LeftOutlined} from "@ant-design/icons";

const CurrentBoard = () => {
    const navigate = useNavigate();
    const toTeam = () => navigate("/team")

    const selectedBoardId = useTypedSelector((state) => state.board?.selectedBoardId);

    const {data: columns} = useGetColumnsByBoardQuery(selectedBoardId || 0,
        {skip: selectedBoardId === null});

    return (
        <div className='board-column-container'>
            <div className='board-column-header-container'>
                <Button icon={<LeftOutlined/>} size='large' shape='round' className='board-column-button'
                        onClick={toTeam}>Вернуться</Button>
                <b className='board-column-header'>Доступные колонки</b>
            </div>
            <div className='board-columns'>
                {columns && columns?.map((column) => (
                    <ColumnCard key={column.columnId} column={column}/>
                ))}
                <CreateColumn/>
            </div>
        </div>
    );
};

export default CurrentBoard;