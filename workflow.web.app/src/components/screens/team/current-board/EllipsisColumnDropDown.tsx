import {Dropdown, MenuProps} from "antd";
import {IoEllipsisVertical} from "react-icons/io5";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const items: MenuProps['items'] = [
    {
        key: 'update',
        label: (
            <a>
                Переименовать
            </a>
        ),
        icon: <EditOutlined/>
    },
    {
        key: 'delete',
        danger: true,
        label: (
            <a>
                Удалить
            </a>
        ),
        icon: <DeleteOutlined/>
    },
];

const EllipsisColumnDropDown = () => {
    return (
        <Dropdown menu={{items}} trigger={['hover']}>
            <IoEllipsisVertical size={'25px'} className='ellipsis-vertical'/>
        </Dropdown>
    );
};

export default EllipsisColumnDropDown;