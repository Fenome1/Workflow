import {FC} from 'react';
import {IColumn} from "../../../../features/models/IColumn.ts";
import EllipsisColumnDropDown from "./EllipsisColumnDropDown.tsx";
import '../current-project/style.scss'
import './style.scss';
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ObjectiveCard from "../current-column/ObjectiveCard.tsx";
import {useGetObjectivesByColumnQuery} from "../../../../store/apis/objectiveApi.ts";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    const {data: objectives} = useGetObjectivesByColumnQuery(column.columnId)
    return (
        <div className='column-card'>
            <div className='column-card-header'>
                <div className='column-card-header-title'>
                    <b className='column-card-name'>{column.name}</b>
                    <EllipsisColumnDropDown/>
                </div>
                <Button className='column-add-objective' type='link' icon={<PlusOutlined width='50px'/>}>Создать
                    задачу</Button>
            </div>
            <div className='column-objectives-content'>
                {objectives && objectives?.map((objective) => (
                    <ObjectiveCard key={objective.objectiveId} objective={objective}/>
                ))}
            </div>
        </div>
    );
};

export default ColumnCard;