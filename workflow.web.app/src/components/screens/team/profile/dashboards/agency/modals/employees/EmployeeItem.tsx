import {FC} from 'react';
import {IUser} from "../../../../../../../../features/models/IUser.ts";
import AvatarItem from "../../../../../../../ui/AvatarItem.tsx";
import {Button} from "antd";
import './style.scss'
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";

interface EmployeeItemProps {
    employee: IUser
    currentUserId?: number
    agency: IAgency
}

const EmployeeItem: FC<EmployeeItemProps> = ({employee, currentUserId, agency}) => {

    const isCurrentUser = employee.userId === currentUserId

    return (
        <div className='employee-item-container'>
            <div className='employee-item-main'>
                <AvatarItem user={employee} className='employee-item-avatar'/>
                <span className='employee-item-name'>{employee.name}</span>
                <span className='employee-item-name'>({employee.email})</span>
                {isCurrentUser && <span className='employee-item-attachment'>Это вы.</span>}
            </div>
            {(!isCurrentUser) &&
                <div className='employee-item-buttons'>
                    <Button danger>Удалить сотрудника</Button>
                </div>
            }
        </div>
    );
};

export default EmployeeItem;