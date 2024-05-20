import {Modal, Typography} from "antd";
import {IDialog} from "../../../../../features/models/IDialog.ts";
import {FC} from "react";
import {DeadlineColors, DeadlineTextColors} from "../../../../../common/Colors.ts";
import './style.scss'
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    EditOutlined,
    FieldTimeOutlined,
    FormOutlined,
    PlusCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import {RiTimerLine} from "react-icons/ri";

interface ReferenceModalProps {
    dialog: IDialog
}

const ReferenceModal: FC<ReferenceModalProps> = ({dialog}) => {
    return (
        <Modal open={dialog.open}
               centered
               onOk={dialog.close}
               onCancel={dialog.close}
               footer={null}
               title='Справка'>
            <div className='references'>
                <div className='row-references'>
                    <div className="interaction-reference">
                        <div className='reference-title-container'>
                            <FormOutlined/>
                            <Typography.Title level={4} className='reference-title'>Взаимодействие с
                                задачей</Typography.Title>
                        </div>
                        <div className="interaction-item">
                            <UserOutlined className='interaction-icon'/>
                            <Typography>Работа с исполнителями</Typography>
                        </div>
                        <div className="interaction-item">
                            <CheckCircleOutlined style={{color: 'gray'}} className='interaction-icon'/>
                            <CheckCircleFilled style={{color: 'forestgreen'}} className='interaction-icon'/>
                            <Typography>Обозначение статуса выполнения</Typography>
                        </div>
                        <div className="interaction-item">
                            <EditOutlined className='interaction-icon'/>
                            <Typography>Редактирование</Typography>
                        </div>
                        <div className="interaction-item">
                            <PlusCircleOutlined className='interaction-icon'/>
                            <Typography>Добавление стикеров</Typography>
                        </div>
                    </div>
                    <div className="color-reference">
                        <div className='reference-title-container'>
                            <FieldTimeOutlined/>
                            <Typography.Title level={4} className='reference-title'>Дедлайн</Typography.Title>
                        </div>
                        <div className="color-item">
                            <div className="color-box" style={{
                                backgroundColor: DeadlineColors.Overdue,
                                border: `${DeadlineTextColors.Overdue} 1px dashed`
                            }}/>
                            <Typography>Просрочено</Typography>
                        </div>
                        <div className="color-item">
                            <div className="color-box" style={{
                                backgroundColor: DeadlineColors.ToDay,
                                border: `${DeadlineTextColors.ToDay} 1px dashed`
                            }}/>
                            <Typography>Сегодня</Typography>
                        </div>
                        <div className="color-item">
                            <div className="color-box" style={{
                                backgroundColor: DeadlineColors.Tomorrow,
                                border: `${DeadlineTextColors.Tomorrow} 1px dashed`
                            }}/>
                            <Typography>Завтра</Typography>
                        </div>
                        <div className="color-item">
                            <div className="color-box" style={{
                                backgroundColor: DeadlineColors.OnThisWeek,
                                border: `${DeadlineTextColors.OnThisWeek} 1px dashed`
                            }}/>
                            <Typography>На этой неделе</Typography>
                        </div>
                        <div className="color-item">
                            <div className="color-box"
                                 style={{
                                     backgroundColor: DeadlineColors.Far,
                                     border: `${DeadlineTextColors.Far} 1px dashed`
                                 }}/>
                            <Typography>Более недели</Typography>
                        </div>
                    </div>
                </div>
                <div className="timer-reference">
                    <div className='reference-title-container'>
                        <RiTimerLine/>
                        <Typography.Title level={4} className='reference-title'>Таймер</Typography.Title>
                    </div>
                    <div className="timer-item">
                        <Typography>Если у задачи установлен дедлайн на сегодня, будет показан таймер.
                            Таймер работает до полуночи; если к этому времени задача не завершена,
                            она автоматически отмечается как просроченная.</Typography>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReferenceModal;