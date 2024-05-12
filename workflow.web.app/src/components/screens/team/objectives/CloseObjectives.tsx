import {IObjective} from "../../../../features/models/IObjective.ts";
import {FC, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {List, Popconfirm, Spin} from "antd";
import {useUpdateObjectiveMutation} from "../../../../store/apis/objective/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {CheckCircleFilled} from "@ant-design/icons";

interface CloseObjectivesProps {
    objectives?: IObjective[];
    loading?: boolean
}

const CloseObjectives: FC<CloseObjectivesProps> = ({objectives, loading}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const [viewObjectives, setViewObjectives] = useState<boolean>(true);

    const updateStatus = async (objective: IObjective) => {

        const updateStatusCommand: IUpdateObjectiveCommand = {
            objectiveId:
            objective.objectiveId,
            status: !objective.status
        }

        await updateObjective(updateStatusCommand)
    }

    return (
        <Spin spinning={loading}>
            <div className='objectives-header-container'>
                <div className='objectives-header'>
                    <div className='objectives-header-button'>
                        {viewObjectives ? <FaChevronUp className='objectives-view-button'
                                                       onClick={() => setViewObjectives(!viewObjectives)}/> :
                            <FaChevronDown className='objectives-view-button'
                                           onClick={() => setViewObjectives(!viewObjectives)}/>}
                    </div>
                    <div className='objectives-header-title'>
                        <p>Завершенные Задачи</p>
                        <p>({objectives?.length})</p>
                    </div>
                </div>

                {viewObjectives && (
                    <List
                        className='objectives-list'
                        dataSource={objectives}
                        renderItem={(objective: IObjective) => (
                            <List.Item key={objective.objectiveId}>
                                <div className='objective-item'>
                                    <Popconfirm
                                        title={`Отметить задачу "${objective.name}" не выполненной?`}
                                        onConfirm={() => updateStatus(objective)}
                                        okText="Да"
                                        cancelText="Нет">
                                        <div className='objective-card-status-icon'
                                             style={{color: 'forestgreen'}}>
                                            <CheckCircleFilled className='objective-status-icon'/>
                                        </div>
                                    </Popconfirm>
                                    <span className='objective-name'>{objective.name}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </Spin>
    );
};

export default CloseObjectives;