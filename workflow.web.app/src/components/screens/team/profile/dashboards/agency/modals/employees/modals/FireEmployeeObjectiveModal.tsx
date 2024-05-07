import {FC} from 'react';
import {Modal} from "antd";
import {
    IFireUserFormAgencyCommand
} from "../../../../../../../../../features/commands/agency/IFireUserFormAgencyCommand.ts";
import {useFireUserFromAgencyMutation} from "../../../../../../../../../store/apis/agencyApi.ts";
import {IUser} from "../../../../../../../../../features/models/IUser.ts";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import {IDialog} from "../../../../../../../../../features/models/IDialog.ts";

interface FireEmployeeModalProps {
    agency: IAgency
    employee: IUser
    dialog: IDialog
}

const FireEmployeeModal: FC<FireEmployeeModalProps> = ({agency, employee, dialog}) => {

    const [fireUserFormAgency] = useFireUserFromAgencyMutation()

    const handleFireUser = async () => {

        const command: IFireUserFormAgencyCommand = {
            agencyId: agency.agencyId,
            userId: employee.userId
        }

        await fireUserFormAgency(command)

        dialog.close()
    }

    return (
        <Modal
            open={dialog.open}
            title="Подтверждение"
            onOk={handleFireUser}
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            okType='danger'
            centered={true}
            footer={(_, {OkBtn, CancelBtn}) => (
                <>
                    <OkBtn/>
                    <CancelBtn/>
                </>
            )}>
            Хотите удалить сотрудника?
        </Modal>
    );
};

export default FireEmployeeModal;