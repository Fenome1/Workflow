import {Dropdown, MenuProps} from "antd";
import {IoEllipsisVertical} from "react-icons/io5";
import "./style.scss"

const items: MenuProps['items'] = [
    {
        key: 'update',
        label: (
            <a>
                Переименовать
            </a>
        ),
    },
    {
        key: 'delete',
        danger: true,
        label: (
            <a>
                Удалить
            </a>
        ),
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