import {FC} from 'react';
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {useDeleteColumnMutation} from "../../../../../store/apis/column/columnApi.ts";
import {Modal} from "antd";

interface DeleteColumnModalProps {
    columnId: number
    dialog: IDialog
}

const DeleteColumnModal: FC<DeleteColumnModalProps> = ({columnId, dialog}) => {
    const [deleteColumn] = useDeleteColumnMutation()

    const handleOk = async () => {
        await deleteColumn(columnId);
        dialog.close()
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
            Хотите удалить колонку?
        </Modal>
    );
};

export default DeleteColumnModal;