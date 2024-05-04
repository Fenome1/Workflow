import {FC} from 'react';
import {useGetUsersByAgencyQuery} from "../../../../../../../../store/apis/userApi.ts";
import EmployeeItem from "./EmployeeItem.tsx";
import './style.scss'
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {Button} from "antd";
import {AiOutlineUserAdd} from "react-icons/ai";
import {useDialog} from "../../../../../../../../hok/useDialog.ts";
import InviteEmployeeModal from "./invite/InviteEmployeeModal.tsx";

interface EmployeesProps {
    agency: IAgency
    currentUserId?: number
}

const Employees: FC<EmployeesProps> = ({agency, currentUserId}) => {
    const {data: users} = useGetUsersByAgencyQuery(agency.agencyId)
    const inviteEmployeeDialog = useDialog()

    return (
        <>
            <div className='employee-list'>
                {users?.map((user) => (<EmployeeItem currentUserId={currentUserId} employee={user} agency={agency}/>))}
                <Button className='employee-invite-button'
                        icon={<AiOutlineUserAdd/>}
                        type='link'
                        onClick={inviteEmployeeDialog.show}>Пригласить
                    сотрудника</Button>
            </div>
            <InviteEmployeeModal dialog={inviteEmployeeDialog}/>
        </>
    );
};

export default Employees;