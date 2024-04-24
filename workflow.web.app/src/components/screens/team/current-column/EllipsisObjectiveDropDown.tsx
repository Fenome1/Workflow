import {Dropdown, MenuProps} from "antd";
import {IoEllipsisVertical} from "react-icons/io5";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {FC} from "react";
import DeleteObjectiveModal from "./modals/DeleteObjectiveModal.tsx";
import {IObjective} from "../../../../features/models/IObjective.ts";
import {useDialog} from "../../../../hok/useDialog.ts";


interface EllipsisObjectiveDropDownProps {
    objective: IObjective
    className?: string;
    startEditing: () => void;
}

const EllipsisObjectiveDropDown: FC<EllipsisObjectiveDropDownProps> = ({className, objective, startEditing}) => {
    const deleteObjectiveModal = useDialog()

    const items: MenuProps['items'] = [
        {
            key: 'update',
            label: (
                <a>
                    Переименовать
                </a>
            ),
            icon: <EditOutlined/>,
            onClick: startEditing
        },
        {
            key: 'delete',
            danger: true,
            label: (
                <a>
                    Удалить
                </a>
            ),
            icon: <DeleteOutlined/>,
            onClick: deleteObjectiveModal.show,
        },
    ];


    return (
        <>
            <Dropdown menu={{items}} trigger={['hover']} className={className}>
                <IoEllipsisVertical size={'15px'} className='ellipsis-vertical'/>
            </Dropdown>
            <DeleteObjectiveModal dialog={deleteObjectiveModal} objectiveId={objective.objectiveId}/>
        </>
    );
};

export default EllipsisObjectiveDropDown;