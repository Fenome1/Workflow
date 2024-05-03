import {IDialog} from "../../../../../features/models/IDialog.ts";
import {FC} from "react";
import {Modal} from "antd";
import {useDeleteAgencyMutation} from "../../../../../store/apis/agencyApi.ts";


interface DeleteAgencyModalProps {
    agencyId: number
    dialog: IDialog
}

const DeleteAgencyModal: FC<DeleteAgencyModalProps> = ({dialog, agencyId}) => {

    const [deleteAgency] = useDeleteAgencyMutation();

    const handleOk = async () => {
        try {
            await deleteAgency(agencyId);
            dialog.close()
        } catch (error) {
            console.error('Ошибка при удалении агентства:', error);
        }
    };

    return (
        <Modal
            open={dialog.open}
            title="Подтверждение"
            onOk={handleOk}
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
            Хотите удалить агентство?
        </Modal>
    );
};

export default DeleteAgencyModal;