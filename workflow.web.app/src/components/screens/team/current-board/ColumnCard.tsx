import {FC, useState} from 'react';
import {IColumn} from "../../../../features/models/IColumn.ts";
import EllipsisColumnDropDown from "./EllipsisColumnDropDown.tsx";
import '../current-project/style.scss'
import './style.scss';
import {Button, Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ObjectiveCard from "../current-column/ObjectiveCard.tsx";
import {useGetObjectivesByColumnQuery} from "../../../../store/apis/objective/objectiveApi.ts";
import {useDialog} from "../../../../hok/useDialog.ts";
import CreateObjectiveCard from "./create-objective/CreateObjectiveCard.tsx";
import {IUpdateColumnCommand} from "../../../../features/commands/column/IUpdateColumnCommand.ts";
import {useUpdateColumnMutation} from "../../../../store/apis/column/columnApi.ts";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    const {data: objectives} = useGetObjectivesByColumnQuery(column.columnId)

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

    return (
        <div className='column-card'>
            <div className='column-card-header'>
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
                        <b className='column-card-name'>{column.name}</b>
                    )}
                    <EllipsisColumnDropDown startEditing={editingDialog.show} columnId={column.columnId}/>
                </div>
                <Button className='column-add-objective' type='link' onClick={createObjectiveDialog.show}
                        icon={<PlusOutlined width='50px'/>}>Создать
                    задачу</Button>
            </div>
            <div className='column-objectives-content'>
                {createObjectiveDialog.open &&
                    <CreateObjectiveCard columnId={column.columnId} dialog={createObjectiveDialog}/>}
                {objectives && objectives?.map((objective) => (
                    <ObjectiveCard key={objective.objectiveId} objective={objective}/>
                ))}
            </div>
        </div>
    );
};

export default ColumnCard;