import React, {FC, useState} from 'react';
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {ICreateColumnCommand} from "../../../../../features/commands/column/ICreateColumnCommand.ts";
import {useCreateColumnMutation} from "../../../../../store/apis/column/columnApi.ts";
import {Input, message} from "antd";

interface CreateColumnCardProps {
    dialog: IDialog
    boardId: number
}

const CreateColumnCard: FC<CreateColumnCardProps> = ({dialog, boardId}) => {
    const [createColumn] = useCreateColumnMutation()
    const [title, setTitle] = useState('');

    const handleCreateColumn = async () => {
        if (!title.trim()) {
            message.error('Название колонки не может быть пустым');
            return;
        }

        const createObjectiveCommand: ICreateColumnCommand = {
            boardId: boardId,
            name: title.trim()
        };

        await createColumn(createObjectiveCommand);

        setTitle('');
        dialog.close();
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            await handleCreateColumn();
        } else if (e.key === 'Escape') {
            setTitle('');
            dialog.close();
        }
    };

    const handleBlur = async () => {
        if (title.trim()) {
            await handleCreateColumn();
        } else {
            dialog.close();
        }
    };

    return (
        <div className='create-column-card'>
            <Input variant='borderless'
                   maxLength={25}
                   autoFocus
                   value={title}
                   onKeyDown={handleKeyPress}
                   onChange={(event) => setTitle(event.target.value)}
                   onBlur={handleBlur}
                   placeholder="Введите название колонки..."></Input>
        </div>
    );
};

export default CreateColumnCard;