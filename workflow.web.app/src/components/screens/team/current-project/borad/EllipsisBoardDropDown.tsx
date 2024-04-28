import React, {FC} from 'react';
import {useDialog} from "../../../../../hok/useDialog.ts";
import {Dropdown, MenuProps} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {IoEllipsisVertical} from "react-icons/io5";
import DeleteBoardModal from "./modals/DeleteBoardModal.tsx";
import UpdateBoardModal from "./modals/UpdateBoardModal.tsx";
import {IBoard} from "../../../../../features/models/IBoard.ts";

interface EllipsisBoardDropDownProps {
    board: IBoard
    className?: string;
    onClick: (event: React.MouseEvent) => void;
}

const EllipsisBoardDropDown: FC<EllipsisBoardDropDownProps> = ({className, onClick, board}) => {
    const deleteBoardModal = useDialog()
    const updateBoardModal = useDialog()

    const items: MenuProps['items'] = [
        {
            key: 'update',
            label: (
                <a>
                    Изменить
                </a>
            ),
            icon: <EditOutlined/>,
            onClick: updateBoardModal.show
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
            onClick: deleteBoardModal.show,
        },
    ];


    return (
        <div onClick={event => onClick(event)}>
            <Dropdown menu={{items}} trigger={['hover']} className={className}>
                <IoEllipsisVertical size={'15px'} className='ellipsis-vertical'/>
            </Dropdown>
            <DeleteBoardModal dialog={deleteBoardModal} boardId={board.boardId}/>
            <UpdateBoardModal dialog={updateBoardModal} board={board}/>
        </div>
    );
};

export default EllipsisBoardDropDown;