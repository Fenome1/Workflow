import {IObjective} from "../../../../features/models/IObjective.ts";
import {FC, useState} from "react";
import './style.scss'
import EllipsisObjectiveDropDown from "./EllipsisObjectiveDropDown.tsx";
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    EditOutlined,
    PlusCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import {IUpdateObjectiveCommand} from "../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {Avatar, Input} from "antd";
import PrioritySticker from "./stickers/priority/PrioritySticker.tsx";
import DeadlineSticker from "./stickers/deadline/DeadlineSticker.tsx";
import AddStickerPopup from "./stickers/sticker-add/AddStickerPopup.tsx";
import {useDialog} from "../../../../hok/useDialog.ts";
import AssignmentChangeModal from "./modals/Assignment/AssignmentChangeModal.tsx";
import {useUpdateObjectiveMutation} from "../../../../store/apis/objective/objectiveApi.ts";
import AvatarItem from "../../../ui/AvatarItem.tsx";
import useTimer from "../../../../hok/useTimer.ts";

interface IObjectiveCardProps {
    objective: IObjective,
}

const ObjectiveCard: FC<IObjectiveCardProps> = ({objective}) => {
    const [updateObjective] = useUpdateObjectiveMutation();

    const [hovered, setHovered] = useState(false);

    const editingDialog = useDialog()
    const addStickerPopup = useDialog()
    const assignmentChangeModal = useDialog()

    const [editedName, setEditedName] = useState(objective.name);

    const {timeLeft, isDeadlineExpired} = useTimer(objective.status, objective?.deadline);

    const updateStatus = async () => {

        const updateStatusCommand: IUpdateObjectiveCommand = {
            objectiveId:
            objective.objectiveId,
            status: !objective.status
        }

        await updateObjective(updateStatusCommand)
    }

    const updateTitle = async () => {

        if (editedName === objective.name) {
            editingDialog.close();
            return;
        }

        const updateNameCommand: IUpdateObjectiveCommand = {
            objectiveId: objective.objectiveId,
            name: editedName
        };

        await updateObjective(updateNameCommand);
        editingDialog.close();
    };

    return (
        <div className={`objective-card ${isDeadlineExpired ? 'overdo' : ''}`}
             style={{
                 opacity: objective.status ? (hovered ? 1 : 0.7) : 1,
             }}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>

            <div className='objective-card-container'>
                <div className='objective-card-container-head'>
                    <div className='objective-card-status-icon'
                         style={{color: objective.status ? "forestgreen" : 'gray'}} onClick={updateStatus}>
                        {objective.status ? <CheckCircleFilled className='objective-status-icon'/> :
                            <CheckCircleOutlined className='objective-status-icon'/>}</div>
                    <div className='objective-card-name-container'>
                        {editingDialog.open ? (
                            <Input
                                className='objective-card-name'
                                placeholder='Имя'
                                type="text"
                                value={editedName}
                                onChange={(event) => setEditedName(event.target.value)}
                                onBlur={updateTitle}
                                variant='borderless'
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter') {
                                        await updateTitle();
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <span className='objective-card-name'>{objective.name}</span>
                        )}
                        {hovered && !editingDialog.open &&
                            <div className='objective-card-name-edit-container'>
                                <EditOutlined className='objective-card-name-edit-icon'
                                              onClick={editingDialog.show}/>
                            </div>}
                    </div>
                    <EllipsisObjectiveDropDown startEditing={editingDialog.show} objectiveId={objective.objectiveId}
                                               className='objective-card-dropdown'/>
                </div>
                {!objective.status &&
                    <div className='objective-card-container-footer'>
                        <div className='objective-card-content-stickers'>
                            {objective.priority &&
                                <PrioritySticker objective={objective}/>
                            }
                            {objective.deadline &&
                                <DeadlineSticker objective={objective}/>
                            }
                            <div className='objective-card-sticker-add-container'>
                                {hovered &&
                                    <PlusCircleOutlined className='objective-card-sticker-add-icon'
                                                        onClick={addStickerPopup.show}/>}
                                <AddStickerPopup objective={objective} dialog={addStickerPopup}/>
                            </div>
                        </div>
                        <div className='objective-card-users' onClick={assignmentChangeModal.show}>
                            {hovered && objective.users && objective.users?.length < 1 &&
                                <div className='objective-card-users-add-container'>
                                    <UserOutlined className='objective-card-users-add-icon'/>
                                </div>
                            }
                            {objective.users && objective.users.length > 0 &&
                                <div className='objective-card-existed-users-container'>
                                    <Avatar.Group maxCount={2}>
                                        {objective.users?.map((user) => (
                                            <AvatarItem key={user.userId} user={user}/>
                                        ))}
                                    </Avatar.Group>
                                </div>
                            }
                        </div>
                    </div>}
                {!objective.status && (timeLeft) && (
                    <div className="objective-card-time-left">
                        <div className="objective-card-time-left-title">
                            {timeLeft}
                        </div>
                    </div>
                )}
                {!objective.status && (isDeadlineExpired) && (
                    <div className="objective-card-time-left">
                        <div className="objective-card-time-left-title">
                            Дедлайн просрочен
                        </div>
                    </div>
                )}
            </div>
            <AssignmentChangeModal dialog={assignmentChangeModal} objective={objective}></AssignmentChangeModal>
        </div>
    );
};

export default ObjectiveCard;