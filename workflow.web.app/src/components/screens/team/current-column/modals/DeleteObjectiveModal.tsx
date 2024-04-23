import {FC} from 'react';
import {Modal} from "antd";
import {useDeleteObjectiveMutation} from "../../../../../store/apis/objectiveApi.ts";

interface DeleteObjectiveModalProps {
    showModal: boolean;
    objectiveId: number;
    onClose: () => void;
}

const DeleteObjectiveModal: FC<DeleteObjectiveModalProps> = ({showModal, objectiveId, onClose}) => {
    const [deleteObjective] = useDeleteObjectiveMutation();

    const handleOk = async () => {
        try {
            await deleteObjective(objectiveId);
            onClose();
        } catch (error) {
            console.error('Error deleting objective:', error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            open={showModal}
            title="Подтверждение"
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Ок'
            cancelText='Отмена'
            okType='danger'
            centered={true}
            footer={(_, {OkBtn, CancelBtn}) => (
                <>
                    <OkBtn/>
                    <CancelBtn/>
                </>
            )}
        >
            Хотите удалить задачу?
        </Modal>
    );
};

export default DeleteObjectiveModal;