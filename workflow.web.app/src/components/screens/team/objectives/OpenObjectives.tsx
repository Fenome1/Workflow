import {FC, useState} from 'react';
import {Avatar, Button, Popconfirm, Spin, Table, TableColumnsType, Tag} from 'antd';
import {IObjective} from '../../../../features/models/IObjective.ts';
import AvatarItem from "../../../ui/AvatarItem.tsx";
import {IUser} from "../../../../features/models/IUser.ts";
import {formatDateTime} from "../../../../hok/formatDateTime.ts";
import {useGetPriorityQuery} from "../../../../store/apis/priority/priorityApi.ts";
import {CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useDeleteObjectiveMutation, useUpdateObjectiveMutation} from "../../../../store/apis/objective/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {selectDeadlineColor} from "../current-column/stickers/deadline/DeadlineStickerContent.tsx";
import {getPriorityColor} from "../current-column/stickers/priority/PriorityStickerContent.tsx";

interface OpenObjectivesProps {
    objectives?: IObjective[];
    loading?: boolean
}

const OpenObjectives: FC<OpenObjectivesProps> = ({objectives, loading}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const {data: priorities, isLoading: priorityLoading} = useGetPriorityQuery()
    const [tableVisible, setTableVisible] = useState<boolean>(true);
    const [deleteObjective] = useDeleteObjectiveMutation()

    const updateStatus = async (objective: IObjective) => {

        const updateStatusCommand: IUpdateObjectiveCommand = {
            objectiveId:
            objective.objectiveId,
            status: !objective.status
        }

        await updateObjective(updateStatusCommand)
    }

    const handleDelete = async (objectiveId: number) => {
        await deleteObjective(objectiveId)
    }

    const columns: TableColumnsType<IObjective> = [
        {
            title: 'Название задачи',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: 500,
            render: (_, objective) => (
                <div className='objective-name-column'>
                    <Popconfirm
                        title={`Отметить задачу "${objective.name}" выполненной?`}
                        onConfirm={() => updateStatus(objective)}
                        okText="Да"
                        cancelText="Нет">
                        <div className='objective-card-status-icon'
                             style={{color: 'gray'}}>
                            <CheckCircleOutlined className='objective-status-icon'/>
                        </div>
                    </Popconfirm>
                    <span>{objective.name}</span>
                </div>
            )
        },
        {
            title: 'Исполнители',
            dataIndex: 'users',
            key: 'users',
            align: 'center',
            width: "0",
            sorter: (a, b) => {
                return (a.users?.length ?? 0) - (b.users?.length ?? 0);
            },
            render: (users: IUser[]) => (
                <span>
                    <Avatar.Group maxCount={2}>
                        {users.map((user: IUser) => (
                            <span>
                                <AvatarItem key={user.userId} user={user}/>
                            </span>
                        ))}
                    </Avatar.Group>
                </span>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'creationDate',
            key: 'creationDate',
            align: 'center',
            width: 1,

            sorter: (a, b) => {
                const dateA = new Date(a.creationDate).getTime();
                const dateB = new Date(b.creationDate).getTime();
                return dateA - dateB;
            },
            render: (date: string) => (
                <span>{formatDateTime(date)}</span>
            )
        },
        {
            title: 'Дедлайн',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            width: '0',
            sorter: (a, b) => {
                const dateA = new Date(a.deadline ?? 0).getTime();
                const dateB = new Date(b.deadline ?? 0).getTime();

                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;

                return dateA - dateB;
            },
            render: (date?: string) => {
                if (!date) return null;
                const currentDate = new Date();
                const differenceInDays = Math.ceil((new Date(date).getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
                const [backgroundColor, textColor] = selectDeadlineColor(differenceInDays);

                return (
                    <Tag
                        style={{backgroundColor: backgroundColor, color: textColor, border: `${textColor} 1px dashed`}}>
                        <span>{date}</span>
                    </Tag>
                );
            }
        },
        {
            title: 'Приоритет',
            dataIndex: 'priority',
            key: 'priority',
            align: 'center',
            filtered: true,
            width: '0',
            filters: priorities?.map(p => ({text: p.name, value: p.priorityId})),
            onFilter: (value, record) => record.priority?.priorityId === value,
            render: (_, value) => {
                if (!value.priority?.priorityId) return null;

                const [backgroundColor, textColor] = getPriorityColor(value.priority?.priorityId);

                return (
                    <>
                        <Tag style={{
                            backgroundColor: backgroundColor,
                            color: textColor,
                            border: `${textColor} 1px dashed`
                        }}>
                            {value.priority?.name}
                        </Tag>
                    </>
                )
            }
        },
        {
            title: 'Удалить',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            width: '0',
            render: (_, value) => {
                return (
                    <>
                        <Popconfirm title="Вы точно хотите удалить задачу?"
                                    onConfirm={() => handleDelete(value.objectiveId)}>
                            <Button danger type='link' icon={<DeleteOutlined/>}/>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    return (
        <Spin spinning={priorityLoading}>
            <div className='objectives-header-container'>
                <div className='objectives-header'>
                    <div className='objectives-header-button'>
                        {tableVisible ? <FaChevronUp className='objectives-view-button'
                                                     onClick={() => setTableVisible(!tableVisible)}/> :
                            <FaChevronDown className='objectives-view-button'
                                           onClick={() => setTableVisible(!tableVisible)}/>}
                    </div>
                    <div className='objectives-header-title'>
                        <p>Открытые Задачи</p>
                        <p>({objectives?.length})</p>
                    </div>
                </div>

                {tableVisible && (
                    <Table
                        pagination={false}
                        size='middle'
                        loading={loading}
                        columns={columns}
                        dataSource={objectives}
                        className='objectives-open-table'
                        bordered={true}
                    />
                )}
            </div>
        </Spin>
    );
};

export default OpenObjectives;
