import {FC} from 'react';
import {IDialog} from "../../../../features/models/IDialog.ts";
import {Form, FormProps, Input, Modal} from "antd";
import {useCreateProjectMutation} from "../../../../store/apis/projectApi.ts";
import {ICreateProjectCommand} from "../../../../features/commands/project/ICreateProjectCommand.ts";

interface CreateProjectModalProps {
    dialog: IDialog,
    agencyId: number | null
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({dialog, agencyId}) => {
    const [createProject] = useCreateProjectMutation()
    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields()
        dialog.close()
    }

    const onFinish: FormProps['onFinish'] = async (command: ICreateProjectCommand) => {
        if (!agencyId)
            return

        command.agencyId = agencyId
        await createProject(command)
        onClose()
    };

    return (
        <Modal
            open={dialog.open}
            title="Создать проект"
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
                    label="Название проекта"
                    rules={[{required: true, message: 'Введите название проекта'}]}>
                    <Input placeholder='Название проекта...' showCount maxLength={25}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProjectModal;