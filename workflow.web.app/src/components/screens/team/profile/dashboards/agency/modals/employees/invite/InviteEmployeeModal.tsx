import {IDialog} from "../../../../../../../../../features/models/IDialog.ts";
import {Button, Form, FormProps, Input, Modal, Space, Table, TableColumnsType, Tabs, Tag} from "antd";
import React, {FC} from "react";
import TabPane from "antd/es/tabs/TabPane";
import {CloseOutlined, MailOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {
    ISendInvitationCommand
} from "../../../../../../../../../features/commands/invitation/ISendInvitationCommand.ts";
import {
    useGetAgencyInvitationsQuery, useRecallInvitationMutation,
    useSendInvitationMutation
} from "../../../../../../../../../store/apis/invitationApi.ts";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import {IInvitation} from "../../../../../../../../../features/models/IInvitation.ts";
import {InvitationStatus} from "../../../../../../../../../common/InvitationStatus.ts";
import './style.scss'
import {PiUsersFourLight} from "react-icons/pi";

interface InviteEmployeeModalProps {
    dialog: IDialog
    agency?: IAgency
}

const InviteEmployeeModal: FC<InviteEmployeeModalProps> = ({dialog, agency}) => {
    const [form] = Form.useForm();
    const [sendInvitation] = useSendInvitationMutation()
    const [recallInvitation] = useRecallInvitationMutation()

    const {data: invitedUsers} = useGetAgencyInvitationsQuery(agency?.agencyId ?? 0,
        {skip: agency?.agencyId === undefined})

    const onFinish: FormProps['onFinish'] = async (command: ISendInvitationCommand) => {
        if (!agency) return;
        command.agencyId = agency.agencyId;
        await sendInvitation(command);
        form.resetFields();
    };

    const columns: TableColumnsType<IInvitation> = [
        {
            title: 'Email',
            dataIndex: 'user',
            align:'start',
            key: 'user',
            render: (_, value) => (
                <div>{value.user.email}</div>
            )
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            align:'center',
            key: 'status',
            filters: [
                {text: 'Ожидание', value: InvitationStatus.Expectation},
                {text: 'Принято', value: InvitationStatus.Accepted},
                {text: 'Отклонено', value: InvitationStatus.Denied},
            ],
            defaultFilteredValue: [InvitationStatus.Expectation],
            onFilter: (value, record) => record.invitationStatus.invitationStatusId === value,
            render: (_, value) => (
                <>
                    <Tag color={
                        value.invitationStatus.invitationStatusId === InvitationStatus.Accepted ? 'success' :
                            value.invitationStatus.invitationStatusId === InvitationStatus.Denied ? 'error' : 'processing'}>
                        {value.invitationStatus.name}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Действие',
            align:'center',
            key: 'recall',
            render: (_, value) => (
                <Space size="middle">
                    {value.invitationStatus.invitationStatusId === InvitationStatus.Expectation &&
                        <Button type="link" icon={<CloseOutlined/>}
                                onClick={() => handleRecallInvitation(value.invitationId)}>Отменить</Button>}
                </Space>
            ),
        },
    ];

    const handleRecallInvitation = async (invitationId: number) => {
        await recallInvitation(invitationId)
    };

    return (
        <Modal
            className='agency-settings-modal'
            centered
            open={dialog.open}
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            title='Приглашение'
            footer={null}>
            <Tabs defaultActiveKey="1">
                <TabPane icon={<UsergroupAddOutlined />} tab="Отправить приглашение" key="1">
                    <Form
                        className='agency-invite-form'
                        form={form}
                        name="inviteForm"
                        layout="horizontal"
                        onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Пожалуйста, введите email!'}]}>
                            <Input type='email' prefix={<MailOutlined/>} placeholder="Email сотрудника..."/>
                        </Form.Item>
                        <Form.Item>
                            <Button className='agency-form-invite-button' type='primary' htmlType="submit">Отправить</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane icon={<PiUsersFourLight />} tab="Приглашенные пользователи" key="2">
                    <Table pagination={false} columns={columns} dataSource={invitedUsers}/>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default InviteEmployeeModal;