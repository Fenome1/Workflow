import {FC} from 'react';
import {IColumn} from "../../features/models/IColumn.ts";
import EllipsisColumnDropDown from "../ui/custom/EllipsisColumnDropDown.tsx";
import './style.scss'
import {IoAddOutline} from "react-icons/io5";

interface IColumnCardProps {
    column: IColumn
}

const ColumnCard: FC<IColumnCardProps> = ({column}) => {
    return (
        <div className='column-card'>
            <div className='column-card-header'>
                <b className='column-card-name'>{column.name}</b>
                <div className='column-ellipsis-dropdown'>
                    <EllipsisColumnDropDown/>
                </div>
            </div>
            <div className='column-objectives-content'>
                <div>
                    Задача типа 1
                </div>
                <div>
                    Задача типа 1
                </div>
                <div>
                    Задача типа 1
                </div>
                <div>
                    Задача типа 1
                </div>
                <div>
                    Задача типа 1
                </div>
                <div>
                    Задача типа 1
                    <div>
                        Задача типа 1
                    </div>
                    <div>
                        Задача типа 1
                    </div>
                    <div>
                        Задача типа 1
                        <div>
                            Задача типа 1
                        </div>
                        <div>
                            Задача типа 1
                        </div>
                        <div>
                            Задача типа 1

                        </div>
                    </div>
                </div>
            </div>
            <div className='column-add-objective'>
                <IoAddOutline/>
                <span>Создать задачу</span>
            </div>
        </div>
    );
};

export default ColumnCard;