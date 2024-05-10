import {IDialog} from "../../../../../../features/models/IDialog.ts";
import {IBoard} from "../../../../../../features/models/IBoard.ts";
import {Form, FormProps, Input, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {FC} from "react";
import {useUpdateBoardMutation} from "../../../../../../store/apis/board/boardApi.ts";
import {IUpdateBoardCommand} from "../../../../../../features/commands/board/IUpdateBoardCommand.ts";

interface CreateBoardModalProps {
    dialog: IDialog
    board: IBoard
}

const UpdateBoardModal: FC<CreateBoardModalProps> = ({dialog, board}) => {
    const [updateBoard] = useUpdateBoardMutation()
    const [form] = Form.useForm();

    const onClose = () => {
        dialog.close()
    }

    const onFinish: FormProps['onFinish'] = async (command: IUpdateBoardCommand) => {
        if (command.name === board.name && command.description === board.description) {
            message.info("Не удалось обновить доску, измените имя или описание")
            return
        }
        command.boardId = board.boardId
        await updateBoard(command)
        onClose()
    };

    return (
        <Modal
            open={dialog.open}
            title="Изменить доску"
            okText="Сохранить"
            cancelText="Отмена"
            onCancel={onClose}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form}
                  onFinish={onFinish}
                  initialValues={{remember: true}}>
                <Form.Item
                    initialValue={board.name}
                    name='name'
                    label="Название доски"
                    rules={[{required: true, message: 'Введите название доски'}]}>
                    <Input placeholder='Название доски...' showCount maxLength={25}/>
                </Form.Item>
                <Form.Item
                    initialValue={board?.description}
                    name='description'
                    label="Описание">
                    <TextArea placeholder='Описание доски...' showCount maxLength={250}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateBoardModal;