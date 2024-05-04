import {IDialog} from "../../../../../../../../../features/models/IDialog.ts";
import {Modal} from "antd";
import {FC} from "react";

interface InviteEmployeeModalProps {
    dialog: IDialog
}

const InviteEmployeeModal: FC<InviteEmployeeModalProps> = ({dialog}) => {
    return (
        <Modal
            className='agency-settings-modal'
            centered
            open={dialog.open}
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            title='Приглашение'
            footer={null}>
        </Modal>
    );
};

export default InviteEmployeeModal;