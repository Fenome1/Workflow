import {FC} from 'react';
import {Modal} from "antd";
import {useDeleteObjectiveMutation} from "../../../../../store/apis/objectiveApi.ts";
import {IDialog} from "../../../../../features/models/IDialog.ts";

interface DeleteObjectiveModalProps {
    objectiveId: number
    dialog: IDialog
}

const DeleteObjectiveModal: FC<DeleteObjectiveModalProps> = ({objectiveId, dialog}) => {
    const [deleteObjective] = useDeleteObjectiveMutation();

    const handleOk = async () => {
        try {
            await deleteObjective(objectiveId);
            dialog.close
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
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
            Хотите удалить задачу?
        </Modal>
    );
};

export default DeleteObjectiveModal;