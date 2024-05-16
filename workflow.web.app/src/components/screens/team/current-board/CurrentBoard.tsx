import {useTypedSelector} from "../../../../store/hooks/hooks.ts";
import {useGetColumnsByBoardQuery, useSwapColumnMutation} from "../../../../store/apis/column/columnApi.ts";
import ColumnCard from "./ColumnCard.tsx";
import './style.scss'
import {Button, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import CreateColumnButton from "./create-column/CreateColumnButton.tsx";
import {LeftOutlined} from "@ant-design/icons";
import {AppColors} from "../../../../common/Colors.ts";
import {DragDropContext, Droppable, OnDragEndResponder} from "react-beautiful-dnd";
import {useState} from "react";
import {ISwapColumnCommand} from "../../../../features/commands/column/ISwapColumnCommand.ts";
import {ISwapObjectiveCommand} from "../../../../features/commands/objective/ISwapObjectiveCommand.ts";
import {useSwapObjectiveMutation} from "../../../../store/apis/objective/objectiveApi.ts";


const CurrentBoard = () => {
    const navigate = useNavigate();
    const toTeam = () => navigate("/team")

    const [swapColumn] = useSwapColumnMutation()
    const [swapObjective] = useSwapObjectiveMutation()

    const [isAnyDragging, setIsAnyDragging] = useState(false);

    const selectedBoardId = useTypedSelector((state) => state.board?.selectedBoardId);

    const {data: columns, isLoading} = useGetColumnsByBoardQuery(selectedBoardId || 0,
        {skip: selectedBoardId === null});

    const handleDragEnd: OnDragEndResponder = async (result) => {
        let command : ISwapColumnCommand | ISwapObjectiveCommand;

        switch (result.type) {
            case 'column':
                command = {
                    columnId: Number(result.destination?.droppableId),
                    objectiveId: Number(result.draggableId),
                    targetOrder: result.destination?.index,
                };
                await swapObjective(command)
                break;
            case 'board':
                command = {
                    columnId: Number(result.draggableId),
                    targetOrder: result.destination?.index,
                };
                await swapColumn(command)
                break;
            default:
                console.error('Unknown type:', result.type);
                break;
        }

        setIsAnyDragging(false);
    };

    return (
        <Spin spinning={isLoading}>
            <DragDropContext onDragEnd={handleDragEnd} onDragStart={() => setIsAnyDragging(true)}>
                <div className='board-column-container' style={{background: AppColors.Primary}}>
                    <div className='board-column-header-container'>
                        <Button icon={<LeftOutlined/>} size='large' shape='round' className='board-column-button'
                                onClick={toTeam}>Вернуться</Button>
                        <b className='board-column-header'>Доступные колонки</b>
                    </div>
                    {!isLoading &&
                        <Droppable direction='horizontal'
                                   key={selectedBoardId}
                                   droppableId={selectedBoardId?.toString() ?? "0"}
                                   type="board">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className='board-columns'>
                                    {columns && columns?.map((column) => (
                                        <ColumnCard key={column.columnId} column={column}/>
                                    ))}
                                    {!isAnyDragging &&
                                        <CreateColumnButton boardId={selectedBoardId ?? 0}
                                                            className='create-column-container'/>
                                    }
                                    {provided.placeholder}
                                </div>)}
                        </Droppable>}
                </div>
            </DragDropContext>
        </Spin>
    );
};

export default CurrentBoard;