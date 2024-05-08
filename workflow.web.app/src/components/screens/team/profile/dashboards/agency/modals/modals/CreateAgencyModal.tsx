import {Form, FormProps, Input, Modal} from "antd";
import {IDialog} from "../../../../../../../../features/models/IDialog.ts";
import {FC} from "react";
import TextArea from "antd/es/input/TextArea";
import {useCreateAgencyMutation} from "../../../../../../../../store/apis/agencyApi.ts";
import {ICreateAgencyCommand} from "../../../../../../../../features/commands/agency/ICreateAgencyCommand.ts";

interface CreateAgencyModalProps {
    dialog: IDialog
    userId?: number
}

const CreateAgencyModal: FC<CreateAgencyModalProps> = ({dialog, userId}) => {
    const [createBoard] = useCreateAgencyMutation()

    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields()
        dialog.close()
    }

    const onFinish: FormProps['onFinish'] = async (command: ICreateAgencyCommand) => {
        if (!userId)
            return

        command.userId = userId
        await createBoard(command)
        onClose()
    };

    return (
        <Modal
            centered
            open={dialog.open}
            title="Создать агентство"
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
                    label="Название агентства"
                    rules={[{required: true, message: 'Введите название нового агентства'}]}>
                    <Input placeholder='Название агентства...' showCount maxLength={50}/>
                </Form.Item>
                <Form.Item
                    name='description'
                    label="Описание">
                    <TextArea placeholder='Описание агентства...' showCount maxLength={250}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateAgencyModal;