import {Dropdown, MenuProps} from "antd";
import {IoEllipsisVertical} from "react-icons/io5";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {FC, useState} from "react";
import DeleteObjectiveModal from "./modals/DeleteObjectiveModal.tsx";
import {IObjective} from "../../../../features/models/IObjective.ts";


interface EllipsisObjectiveDropDownProps {
    objective: IObjective
    className?: string;
}

const EllipsisObjectiveDropDown: FC<EllipsisObjectiveDropDownProps> = ({className, objective}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: 'update',
            label: (
                <a>
                    Переименовать
                </a>
            ),
            icon: <EditOutlined/>,
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
            onClick: () => setShowDeleteModal(true),
        },
    ];


    return (
        <>
            <Dropdown menu={{items}} trigger={['hover']} className={className}>
                <IoEllipsisVertical size={'15px'} className='ellipsis-vertical'/>
            </Dropdown>
            <DeleteObjectiveModal showModal={showDeleteModal} objectiveId={objective.objectiveId}
                                  onClose={() => setShowDeleteModal(false)}/>
        </>
    );
};

export default EllipsisObjectiveDropDown;