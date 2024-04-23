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
import {FaUserGroup} from "react-icons/fa6";

interface IObjectiveCardProps {
    objective: IObjective
    objectiveId: number
}

const ObjectiveCard: FC<IObjectiveCardProps> = ({objective}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className='objective-card' style={{opacity: objective.status ? (hovered ? 1 : 0.6) : 1}}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>

            <div className='objective-card-container'>
                <div className='objective-card-container-head'>
                    <div className='objective-card-status-icon'
                         style={{color: objective.status ? "forestgreen" : 'gray'}}>
                        {objective.status ? <CheckCircleFilled/> : <CheckCircleOutlined/>}</div>
                    <div className='objective-card-name-container'>
                        <span className='objective-card-name'>{objective.name}</span>
                        {hovered &&
                            <div className='objective-card-name-edit-container'>
                                <EditOutlined className='objective-card-name-edit-icon'/>
                            </div>}
                    </div>
                    <EllipsisObjectiveDropDown objective={objective} className='objective-card-dropdown'/>
                </div>
                <div className='objective-card-container-footer'>
                    <div className='objective-card-content-stickers'>
                        {/* <div className='objective-sticker'>
                        </div>*/}
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