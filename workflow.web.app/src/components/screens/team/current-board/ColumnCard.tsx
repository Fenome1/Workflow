import {FC} from 'react';
import {IColumn} from "../../../../features/models/IColumn.ts";
import EllipsisColumnDropDown from "../../../ui/custom/EllipsisColumnDropDown.tsx";
import '../current-project/style.scss'
import './style.scss';
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    return (
        <div className='column-card'>
            <div className='column-card-header'>
                <div className='column-card-header-title'>
                    <b className='column-card-name'>{column.name}</b>
                    <EllipsisColumnDropDown/>
                </div>
                <Button className='column-add-objective' type='link' icon={<PlusOutlined />}>Создать задачу</Button>
            </div>
            <div className='column-objectives-content'>
            </div>
        </div>
    );
};

export default ColumnCard;