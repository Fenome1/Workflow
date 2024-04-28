import {FC} from 'react';
import {IDialog} from "../../../../../../features/models/IDialog.ts";
import {Form, FormProps, Input, Modal} from "antd";
import {ICreateBoardCommand} from "../../../../../../features/commands/board/ICreateBoardCommand.ts";
import {useCreateBoardMutation} from "../../../../../../store/apis/boardApi.ts";
import TextArea from "antd/es/input/TextArea";

interface CreateBoardModalProps {
    dialog: IDialog
    projectId: number
}

const CreateBoardModal: FC<CreateBoardModalProps> = ({dialog, projectId}) => {
    const [createBoard] = useCreateBoardMutation()
    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields()
        dialog.close()
    }

    const onFinish: FormProps['onFinish'] = async (command: ICreateBoardCommand) => {
        command.projectId = projectId
        await createBoard(command)
        onClose()
    };

    return (
        <Modal
            open={dialog.open}
            title="Создать новую доску"
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
                  onFinish={onFinish}>
                <Form.Item
                    name='name'
                    label="Название доски"
                    rules={[{required: true, message: 'Введите название доски'}]}>
                    <Input placeholder='Название доски...' showCount maxLength={25}/>
                </Form.Item>
                <Form.Item
                    name='description'
                    label="Описание">
                    <TextArea placeholder='Описание доски...' showCount maxLength={250}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateBoardModal;