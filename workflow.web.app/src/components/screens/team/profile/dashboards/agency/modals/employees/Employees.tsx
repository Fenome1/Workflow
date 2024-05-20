import {FC} from 'react';
import {useGetUsersByAgencyQuery} from "../../../../../../../../store/apis/user/userApi.ts";
import EmployeeItem from "./EmployeeItem.tsx";
import './style.scss'
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {Button, Skeleton} from "antd";
import {AiOutlineUserAdd} from "react-icons/ai";
import {useDialog} from "../../../../../../../../hok/useDialog.ts";
import InviteEmployeeModal from "./invite/InviteEmployeeModal.tsx";

interface EmployeesProps {
    agency: IAgency
    currentUserId?: number
}

const Employees: FC<EmployeesProps> = ({agency, currentUserId}) => {
    const {data: users, isLoading} = useGetUsersByAgencyQuery(agency.agencyId)
    const inviteEmployeeDialog = useDialog()

    return (
        <>
            <div className='employee-list-modal'>
                <div className='employee-list'>
                    {isLoading ?
                        <Skeleton active/> :
                        users?.map((user) => (<EmployeeItem
                            key={user.userId}
                            currentUserId={currentUserId}
                            employee={user}
                            agency={agency}/>))}
                </div>
                <Button className='employee-invite-button'
                        icon={<AiOutlineUserAdd/>}
                        type='link'
                        onClick={inviteEmployeeDialog.show}>Пригласить
                    сотрудника</Button>
            </div>
            <InviteEmployeeModal dialog={inviteEmployeeDialog} agency={agency}/>
        </>
    );
};

export default Employees;