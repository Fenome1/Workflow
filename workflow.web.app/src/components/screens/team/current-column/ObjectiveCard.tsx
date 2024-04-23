import {IObjective} from "../../../../features/models/IObjective.ts";
import React, {FC, useState} from "react";
import './style.scss'
import EllipsisObjectiveDropDown from "./EllipsisObjectiveDropDown.tsx";
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    EditOutlined,
    PlusCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import {FaUserGroup} from "react-icons/fa6";
import {useUpdateObjectiveMutation} from "../../../../store/apis/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {Input} from "antd";
import DeadlineSticker from "./stickers/deadline/DeadlineSticker.tsx";
import PrioritySticker from "./stickers/priority/PrioritySticker.tsx";

interface IObjectiveCardProps {
    objective: IObjective
}

const ObjectiveCard: FC<IObjectiveCardProps> = ({objective}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const [hovered, setHovered] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(objective.name);

    const updateStatus = async () => {

        const updateStatusCommand: IUpdateObjectiveCommand = {
            objectiveId:
            objective.objectiveId,
            status: !objective.status
        }

        await updateObjective(updateStatusCommand)
    }

    const startEditing = () => {
        setEditing(true);
    };

    const finishEditing = async () => {

        if (editedName === objective.name) {
            setEditing(false);
            return;
        }

        const updateNameCommand: IUpdateObjectiveCommand = {
            objectiveId: objective.objectiveId,
            name: editedName
        };

        await updateObjective(updateNameCommand);
        setEditing(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
    };

    return (
        <div className='objective-card' style={{opacity: objective.status ? (hovered ? 1 : 0.6) : 1}}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>

            <div className='objective-card-container'>
                <div className='objective-card-container-head'>
                    <div className='objective-card-status-icon'
                         style={{color: objective.status ? "forestgreen" : 'gray'}} onClick={updateStatus}>
                        {objective.status ? <CheckCircleFilled/> : <CheckCircleOutlined/>}</div>
                    <div className='objective-card-name-container'>
                        {editing ? (
                            <Input
                                className='objective-card-name'
                                placeholder='Имя'
                                type="text"
                                value={editedName}
                                onChange={handleInputChange}
                                onBlur={finishEditing}
                                variant='borderless'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        finishEditing();
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <span className='objective-card-name'>{objective.name}</span>
                        )}
                        {hovered && !editing &&
                            <div className='objective-card-name-edit-container'>
                                <EditOutlined className='objective-card-name-edit-icon' onClick={startEditing}/>
                            </div>}
                    </div>
                    <EllipsisObjectiveDropDown startEditing={startEditing} objective={objective}
                                               className='objective-card-dropdown'/>
                </div>
                <div className='objective-card-container-footer'>
                    <div className='objective-card-content-stickers'>
                        {objective.priority &&
                            <PrioritySticker objective={objective}/>
                        }
                        {objective.deadline &&
                            <DeadlineSticker deadline={objective.deadline}/>
                        }
                        {hovered &&
                            <div className='objective-card-sticker-add-container'>
                                <PlusCircleOutlined className='objective-card-sticker-add-icon'/>
                            </div>
                        }
                    </div>
                    <div className='objective-card-users'>
                        {hovered && objective.users && objective.users?.length < 1 &&
                            <div className='objective-card-users-add-container'>
                                <UserOutlined className='objective-card-users-add-icon'/>
                            </div>
                        }
                        {objective.users && objective.users.length > 0 &&
                            <div className='objective-card-existed-users-container'>
                                <FaUserGroup className='objective-card-existed-users-icon'/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectiveCard;