import React, {FC, useState} from 'react';
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {ICreateColumnCommand} from "../../../../../features/commands/column/ICreateColumnCommand.ts";
import {useCreateColumnMutation} from "../../../../../store/apis/columnApi.ts";
import {Input} from "antd";

interface CreateColumnCardProps {
    dialog: IDialog
    boardId: number
}

const CreateColumnCard: FC<CreateColumnCardProps> = ({dialog, boardId}) => {
    const [createColumn] = useCreateColumnMutation()
    const [title, setTitle] = useState('');

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            const createObjectiveCommand: ICreateColumnCommand = {
                boardId: boardId,
                name: title
            }

            await createColumn(createObjectiveCommand);

            setTitle('');
            dialog.close()
            return
        }
        if (e.key === 'Escape') {
            dialog.close()
            return;
        }
    };

    const handleBlur = () => {
        setTitle('');
        dialog.close()
    };

    return (
        <div className='create-column-card'>
            <Input variant='borderless'
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