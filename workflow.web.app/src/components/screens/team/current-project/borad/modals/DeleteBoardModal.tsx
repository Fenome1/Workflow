import {FC} from 'react';
import {IDialog} from "../../../../../../features/models/IDialog.ts";
import {useDeleteBoardMutation} from "../../../../../../store/apis/boardApi.ts";
import {Modal} from "antd";

interface DeleteBoardModalProps {
    dialog: IDialog;
    boardId: number
}

const DeleteBoardModal: FC<DeleteBoardModalProps> = ({dialog, boardId}) => {
    const [deleteBoard] = useDeleteBoardMutation()

    const handleOk = async () => {
        await deleteBoard(boardId);
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
            Хотите удалить доску?
        </Modal>
    );
};

export default DeleteBoardModal;