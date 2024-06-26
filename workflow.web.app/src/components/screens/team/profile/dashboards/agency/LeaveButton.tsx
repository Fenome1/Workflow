import {FC} from 'react';
import {IAgency} from "../../../../../../features/models/IAgency.ts";
import {IUser} from "../../../../../../features/models/IUser.ts";
import {Button, Popconfirm} from "antd";
import {useFireUserFromAgencyMutation} from "../../../../../../store/apis/agency/agencyApi.ts";
import {IFireUserFormAgencyCommand} from "../../../../../../features/commands/agency/IFireUserFormAgencyCommand.ts";
import {FireVariant} from "../../../../../../common/FireVariant.ts";
import {useAppDispatch, useTypedSelector} from "../../../../../../store/hooks/hooks.ts";
import {selectAgency} from "../../../../../../store/slices/agencySlice.ts";
import {selectProject} from "../../../../../../store/slices/projectSlice.ts";

type LeaveButtonProps = {
    agency: IAgency
    currentUser: IUser | null
}

const LeaveButton: FC<LeaveButtonProps> = ({agency, currentUser}) => {
    const dispatch = useAppDispatch()
    const selectedAgencyId = useTypedSelector((state) => state.agency.selectedAgencyId)
    const [fireUserFormAgency] = useFireUserFromAgencyMutation()

    const handleFireUser = async () => {
        if (!currentUser?.userId)
            return

        const command: IFireUserFormAgencyCommand = {
            agencyId: agency.agencyId,
            userId: currentUser.userId,
            fireVariant: FireVariant.Self
        }

        if (selectedAgencyId === agency.agencyId) {
            await dispatch(selectAgency(undefined))
            await dispatch(selectProject(undefined))
        }

        await fireUserFormAgency(command)
    }

    return (
        <Popconfirm title='Вы хотите покинуть агенство?' onConfirm={handleFireUser} okText='Да' cancelText='Нет'
                    onPopupClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
            <Button size='small' danger onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>Покинуть</Button>
        </Popconfirm>
    );
};

export default LeaveButton;