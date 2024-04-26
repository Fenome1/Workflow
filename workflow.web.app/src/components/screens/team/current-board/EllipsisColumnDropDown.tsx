import {Dropdown, MenuProps} from "antd";
import {IoEllipsisVertical} from "react-icons/io5";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {FC} from "react";
import {useDialog} from "../../../../hok/useDialog.ts";
import DeleteColumnModal from "./modals/DeleteColumnModal.tsx";

interface EllipsisColumnDropDownProps {
    columnId: number
    startEditing: () => void;
}

const EllipsisColumnDropDown: FC<EllipsisColumnDropDownProps> = ({startEditing, columnId}) => {
    const deleteColumnModal = useDialog()

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
            onClick: deleteColumnModal.show
        },
    ];

    return (
        <>
            <Dropdown menu={{items}} trigger={['hover']}>
                <IoEllipsisVertical size={'25px'} className='ellipsis-vertical'/>
            </Dropdown>
            <DeleteColumnModal columnId={columnId} dialog={deleteColumnModal}/>
        </>
    );
};

export default EllipsisColumnDropDown;