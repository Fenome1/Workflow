import {FC} from 'react';
import {IColumn} from "../../../../../features/models/IColumn.ts";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    return (
        <div>
            Колонка: {column.name}
        </div>
    );
};

export default ColumnCard;