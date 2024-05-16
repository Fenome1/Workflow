import {FC, useState} from 'react';
import {IColumn} from "../../../../features/models/IColumn.ts";
import EllipsisColumnDropDown from "./EllipsisColumnDropDown.tsx";
import '../current-project/style.scss'
import './style.scss';
import {Button, Input, Progress, Skeleton} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ObjectiveCard from "../current-column/ObjectiveCard.tsx";
import {useGetObjectivesByColumnQuery} from "../../../../store/apis/objective/objectiveApi.ts";
import {useDialog} from "../../../../hok/useDialog.ts";
import CreateObjectiveCard from "./create-objective/CreateObjectiveCard.tsx";
import {IUpdateColumnCommand} from "../../../../features/commands/column/IUpdateColumnCommand.ts";
import {useUpdateColumnMutation} from "../../../../store/apis/column/columnApi.ts";
import {Draggable} from "react-beautiful-dnd";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    const {data: objectives, isLoading} = useGetObjectivesByColumnQuery(column.columnId)

    const [updateColumn] = useUpdateColumnMutation()
    const createObjectiveDialog = useDialog()
    const editingDialog = useDialog()

    const [editedName, setEditedName] = useState(column.name);

    const updateTitle = async () => {

        if (editedName === column.name) {
            editingDialog.close();
            return;
        }

        const updateNameCommand: IUpdateColumnCommand = {
            columnId: column.columnId,
            name: editedName
        };

        await updateColumn(updateNameCommand);
        editingDialog.close();
    };

    const percentComplete = (): number => {
        if (!objectives) return 0

        const completedCount = objectives.filter(o => o.status).length
        const totalCount = objectives.length

        if (totalCount === 0) return 0

        return Math.round((completedCount / totalCount) * 100)
    };

    return (
        <Draggable draggableId={column.columnId.toString()} index={column.order}>
            {(provided) => (
                <div className='column-card' ref={provided.innerRef} {...provided.draggableProps}>
                    <div className='column-card-header'
                         {...provided.dragHandleProps}
                        >
                        <div className='column-card-header-title'>
                            {editingDialog.open ? (
                                <Input
                                    className='column-card-name-input'
                                    placeholder='Имя'
                                    type="text"
                                    value={editedName}
                                    onChange={(event) => setEditedName(event.target.value)}
                                    onBlur={updateTitle}
                                    variant='borderless'
                                    onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                            await updateTitle();
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <div className='column-card-name'>
                                    <div className='column-card-name-title'>{column.name}</div>
                                    {objectives && objectives.length > 0 &&
                                        <div className='column-card-name-count'>({objectives.length})</div>
                                    }
                                </div>
                            )}
                            <EllipsisColumnDropDown startEditing={editingDialog.show} columnId={column.columnId}/>
                        </div>
                        <Button className='column-add-objective' type='link' onClick={createObjectiveDialog.show}
                                icon={<PlusOutlined width='50px'/>}>Создать
                            задачу</Button>
                        {objectives && objectives.length > 0 &&
                            <Progress percent={percentComplete()} strokeColor='lightgreen'/>}
                    </div>
                    <div className='column-objectives-content'>
                        {createObjectiveDialog.open &&
                            <CreateObjectiveCard columnId={column.columnId} dialog={createObjectiveDialog}/>}
                        {objectives && objectives?.map((objective) => (
                            <Skeleton loading={isLoading}>
                                <ObjectiveCard key={objective.objectiveId} objective={objective}/>
                            </Skeleton>
                        ))}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default ColumnCard;