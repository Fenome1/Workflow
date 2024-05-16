import {IDialog} from "../../../../../../../../features/models/IDialog.ts";
import {FC} from "react";
import {Form, FormProps, Input, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {IUpdateAgencyCommand} from "../../../../../../../../features/commands/agency/IUpdateAgencyCommand.ts";
import {IAgency} from "../../../../../../../../features/models/IAgency.ts";
import {useUpdateAgencyMutation} from "../../../../../../../../store/apis/agency/agencyApi.ts";

interface EditAgencyModalProps {
    dialog: IDialog
    agency: IAgency
}

const UpdateAgencyModal: FC<EditAgencyModalProps> = ({dialog, agency}) => {
    const [updateBoard] = useUpdateAgencyMutation()
    const [form] = Form.useForm();

    const onClose = () => {
        dialog.close()
    }

    const onFinish: FormProps['onFinish'] = async (command: IUpdateAgencyCommand) => {
        if (command.name === agency.name && command.description === agency.description) {
            message.info("Не удалось обновить агентство, измените имя или описание")
            return
        }
        command.agencyId = agency.agencyId
        await updateBoard(command)
        onClose()
    };

    return (
        <Modal
            centered
            open={dialog.open}
            title="Изменить агентство"
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
                    initialValue={agency.name}
                    name='name'
                    label="Название агентства"
                    rules={[{required: true, message: 'Введите название агентства'}]}>
                    <Input placeholder='Название агентства...' showCount maxLength={50}/>
                </Form.Item>
                <Form.Item
                    initialValue={agency?.description}
                    name='description'
                    label="Описание">
                    <TextArea placeholder='Описание агентства...' showCount maxLength={250}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateAgencyModal;