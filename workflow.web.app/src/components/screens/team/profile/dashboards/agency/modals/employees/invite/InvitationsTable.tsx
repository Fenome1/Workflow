import {FC} from 'react';
import {Button, Space, Table, TableColumnsType, Tag} from "antd";
import {
    useGetAgencyInvitationsQuery,
    useRecallInvitationMutation
} from "../../../../../../../../../store/apis/invitation/invitationApi.ts";
import {IInvitation} from "../../../../../../../../../features/models/IInvitation.ts";
import {InvitationStatus} from "../../../../../../../../../common/InvitationStatus.ts";
import {CloseOutlined} from "@ant-design/icons";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";


interface InvitationsTableProps {
    agency?: IAgency
}

const InvitationsTable: FC<InvitationsTableProps> = ({agency}) => {

    const [recallInvitation] = useRecallInvitationMutation()

    const {data: invitedUsers} = useGetAgencyInvitationsQuery(agency?.agencyId ?? 0,
        {skip: agency?.agencyId === undefined})


    const columns: TableColumnsType<IInvitation> = [
        {
            title: 'Email',
            dataIndex: 'user',
            align: 'start',
            key: 'user',
            render: (_, value) => (
                <div>{value.user?.email}</div>
            )
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            align: 'center',
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
            align: 'center',
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
        <Table pagination={false} columns={columns} dataSource={invitedUsers}/>
    );
};

export default InvitationsTable;