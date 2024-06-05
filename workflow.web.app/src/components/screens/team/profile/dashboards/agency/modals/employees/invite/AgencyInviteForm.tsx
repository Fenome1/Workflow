import {Button, Form, FormProps, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {
    ISendInvitationCommand
} from "../../../../../../../../../features/commands/invitation/ISendInvitationCommand.ts";
import {useSendInvitationMutation} from "../../../../../../../../../store/apis/invitation/invitationApi.ts";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import {FC} from "react";

interface AgencyInviteFormProps {
    agency?: IAgency
}

const AgencyInviteForm: FC<AgencyInviteFormProps> = ({agency}) => {
    const [form] = Form.useForm();

    const [sendInvitation] = useSendInvitationMutation()

    const onFinish: FormProps['onFinish'] = async (command: ISendInvitationCommand) => {
        if (!agency) return;
        command.agencyId = agency.agencyId;
        await sendInvitation(command);
        form.resetFields();
    };

    return (
        <Form
            className='agency-invite-form'
            form={form}
            name="inviteForm"
            layout="horizontal"
            onFinish={onFinish}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Пожалуйста, введите email!'},
                    {type: 'email', message: 'Некорректный формат email адреса'}]}
            >
                <Input prefix={<MailOutlined/>} placeholder="Email сотрудника..."/>
            </Form.Item>
            <Form.Item>
                <Button className='agency-form-invite-button' type='primary'
                        htmlType="submit">Отправить</Button>
            </Form.Item>
        </Form>
    );
};

export default AgencyInviteForm;