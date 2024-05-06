import {FC} from 'react';
import {IUser} from "../../../../../../../../features/models/IUser.ts";
import AvatarItem from "../../../../../../../ui/AvatarItem.tsx";
import {Button} from "antd";
import './style.scss'
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {useFireUserFromAgencyMutation} from "../../../../../../../../store/apis/agencyApi.ts";
import {
    IFireUserFormAgencyCommand
} from "../../../../../../../../features/commands/agency/IFireUserFormAgencyCommand.ts";

interface EmployeeItemProps {
    employee: IUser
    currentUserId?: number
    agency: IAgency
}

const EmployeeItem: FC<EmployeeItemProps> = ({employee, currentUserId, agency}) => {
    const [fireUserFormAgency] = useFireUserFromAgencyMutation()
    const isCurrentUser = employee.userId === currentUserId

    const handleFireUser = async () => {

        const command: IFireUserFormAgencyCommand = {
            agencyId: agency.agencyId,
            userId: employee.userId
        }

        await fireUserFormAgency(command)
    }

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
                    <Button danger onClick={handleFireUser}>Удалить сотрудника</Button>
                </div>
            }
        </div>
    );
};

export default EmployeeItem;