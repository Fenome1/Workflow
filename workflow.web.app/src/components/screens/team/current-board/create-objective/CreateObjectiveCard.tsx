import './style.scss'
import {Input} from "antd";
import React, {FC, useState} from "react";
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {useCreateObjectiveMutation} from "../../../../../store/apis/objectiveApi.ts";
import {ICreateObjectiveCommand} from "../../../../../features/commands/objective/ICreateObjectiveCommand.ts";

interface CreateObjectiveCardProps {
    columnId: number
    dialog: IDialog
}

const CreateObjectiveCard: FC<CreateObjectiveCardProps> = ({columnId, dialog}) => {
    const [createObjective] = useCreateObjectiveMutation()
    const [title, setTitle] = useState('');

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            const createObjectiveCommand: ICreateObjectiveCommand = {
                columnId: columnId,
                name: title
            }

            await createObjective(createObjectiveCommand);

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
        dialog.close();
        setTitle('');
    };

    return (
        <div className='create-objective-card'>
            <Input variant='borderless'
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