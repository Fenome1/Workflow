import {FC, useState} from 'react';
import {IProject} from "../../../../../../../../features/models/IProject.ts";
import {Button, Input, message, Popconfirm} from 'antd';
import {DeleteOutlined, EditOutlined, FolderOutlined} from '@ant-design/icons';
import {
    useDeleteProjectMutation,
    useUpdateProjectMutation
} from "../../../../../../../../store/apis/project/projectApi.ts";
import {useDialog} from "../../../../../../../../hok/useDialog.ts";
import {IUpdateProjectCommand} from "../../../../../../../../features/commands/project/IUpdateProjectCommand.ts";

interface ProjectItemProps {
    project: IProject
    isLastProject: boolean
}

const ProjectItem: FC<ProjectItemProps> = ({project, isLastProject}) => {
    const editingDialog = useDialog()

    const [editedName, setEditedName] = useState(project.name);

    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();

    const updateName = async () => {
        if (editedName === project.name) {
            editingDialog.close();
            return;
        }

        const updateNameCommand: IUpdateProjectCommand = {
            projectId: project.projectId,
            name: editedName
        };

        await updateProject(updateNameCommand);
        editingDialog.close();
    };

    const handleEditClick = () => editingDialog.show();

    const handleDeleteConfirm = async () => {
        if(isLastProject){
            message.error("Не возможно удалить последний проект")
            return
        }
        await deleteProject(project.projectId)
    }

    return (
        <div className="project-item">
            <FolderOutlined style={{fontSize: '13pt', marginRight: '10px'}}/>
            {editingDialog.open ? (
                <Input
                    type="text"
                    className='project-name'
                    value={editedName}
                    variant='borderless'
                    onChange={(event) => setEditedName(event.target.value)}
                    onBlur={updateName}
                    maxLength={25}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                            await updateName();
                        }
                    }}
                    autoFocus
                />
            ) : (
                <div className="project-name">{project.name}</div>
            )}
            <div className="project-actions">
                <Button type="link" className='edit-project-button' icon={<EditOutlined/>}
                        onClick={handleEditClick}/>
                <Popconfirm
                    title="Удалить проект?"
                    onConfirm={handleDeleteConfirm}
                    okText="Да"
                    cancelText="Нет">
                    <Button type="link" danger icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>
        </div>
    );
};

export default ProjectItem;