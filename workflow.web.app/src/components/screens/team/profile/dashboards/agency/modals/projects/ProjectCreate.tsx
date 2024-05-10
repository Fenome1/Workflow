import {IDialog} from "../../../../../../../../features/models/IDialog.ts";
import React, {FC, useState} from "react";
import {useCreateProjectMutation} from "../../../../../../../../store/apis/project/projectApi.ts";
import {ICreateProjectCommand} from "../../../../../../../../features/commands/project/ICreateProjectCommand.ts";
import {Input} from "antd";

interface ProjectCreateProps {
    dialog: IDialog
    agencyId: number
}

const ProjectCreate: FC<ProjectCreateProps> = ({dialog, agencyId}) => {
    const [createProject] = useCreateProjectMutation()
    const [name, setName] = useState('');

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            const createObjectiveCommand: ICreateProjectCommand = {
                agencyId: agencyId,
                name: name
            }

            await createProject(createObjectiveCommand);

            setName('');
            dialog.close()
            return
        }
        if (e.key === 'Escape') {
            dialog.close()
            return;
        }
    };

    const handleBlur = () => {
        setName('');
        dialog.close()
    };

    return (
        <div className="project-item">
            <Input variant='borderless'
                   autoFocus
                   value={name}
                   onKeyDown={handleKeyPress}
                   onChange={(event) => setName(event.target.value)}
                   onBlur={handleBlur}
                   placeholder="Введите название проекта..."></Input>
        </div>
    );
};

export default ProjectCreate;