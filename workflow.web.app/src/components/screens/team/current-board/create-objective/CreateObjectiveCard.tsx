import './style.scss'
import {Input, message} from "antd";
import React, {FC, useState} from "react";
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {useCreateObjectiveMutation} from "../../../../../store/apis/objective/objectiveApi.ts";
import {ICreateObjectiveCommand} from "../../../../../features/commands/objective/ICreateObjectiveCommand.ts";

interface CreateObjectiveCardProps {
    columnId: number
    dialog: IDialog
}

const CreateObjectiveCard: FC<CreateObjectiveCardProps> = ({columnId, dialog}) => {
    const [createObjective] = useCreateObjectiveMutation()
    const [title, setTitle] = useState('');

    const handleCreateColumn = async () => {
        if (!title.trim()) {
            message.error('Название задачи не может быть пустым');
            return;
        }

        const createObjectiveCommand: ICreateObjectiveCommand = {
            columnId: columnId,
            name: title.trim()
        }

        await createObjective(createObjectiveCommand);

        setTitle('');
        dialog.close()
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
        <div className='create-objective-card'>
            <Input variant='borderless'
                   style={{fontSize: '12pt'}}
                   maxLength={500}
                   autoFocus
                   value={title}
                   onKeyDown={handleKeyPress}
                   onChange={(event) => setTitle(event.target.value)}
                   onBlur={handleBlur}
                   placeholder="Введите название задачи..."></Input>
        </div>
    );
};

export default CreateObjectiveCard;