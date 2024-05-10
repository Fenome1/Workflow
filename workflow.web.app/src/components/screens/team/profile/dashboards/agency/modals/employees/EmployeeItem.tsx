import {FC} from 'react';
import {IUser} from "../../../../../../../../features/models/IUser.ts";
import AvatarItem from "../../../../../../../ui/AvatarItem.tsx";
import {Button, Popconfirm} from "antd";
import './style.scss'
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {useDialog} from "../../../../../../../../hok/useDialog.ts";
import {useFireUserFromAgencyMutation} from "../../../../../../../../store/apis/agency/agencyApi.ts";
import {
    IFireUserFormAgencyCommand
} from "../../../../../../../../features/commands/agency/IFireUserFormAgencyCommand.ts";
import {FireVariant} from "../../../../../../../../common/FireVariant.ts";

interface EmployeeItemProps {
    employee: IUser
    currentUserId?: number
    agency: IAgency
}

const EmployeeItem: FC<EmployeeItemProps> = ({employee, currentUserId, agency}) => {
    const isCurrentUser = employee.userId === currentUserId

    const fireUserDialog = useDialog()

    const [fireUserFormAgency] = useFireUserFromAgencyMutation()

    const handleFireUser = async () => {

        const command: IFireUserFormAgencyCommand = {
            agencyId: agency.agencyId,
            userId: employee.userId,
            fireVariant: FireVariant.Someone
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
                    <Popconfirm title="Удалить сотрудника?"
                                onConfirm={handleFireUser}
                                okText="Да"
                                cancelText="Нет">
                        <Button danger onClick={fireUserDialog.show}>Удалить сотрудника</Button>
                    </Popconfirm>
                </div>
            }
        </div>
    );
};

export default EmployeeItem;