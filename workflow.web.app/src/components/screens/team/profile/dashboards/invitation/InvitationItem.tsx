import React, {useState} from 'react';
import {Button, Typography} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {IInvitation} from "../../../../../../features/models/IInvitation.ts";
import AnswerInvitationModal from "./modals/AnswerInvitationModal.tsx";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import {AnswerType} from "../../../../../../common/AnswerType.ts";

interface InvitationItemProps {
    invitation: IInvitation;
}

const InvitationItem: React.FC<InvitationItemProps> = ({invitation}) => {
    const [answerType, setAnswerType] = useState<AnswerType>();
    const answerInvitationDialog = useDialog();

    const handleAnswer = (type: AnswerType) => {
        setAnswerType(type);
        answerInvitationDialog.show();
    };

    return (
        <>
            <div className='invitation-item'>
                <Typography className='invitation-item-title'>Агентство "{invitation.agencyName}"</Typography>
                <div className='invitation-item-buttons'>
                    <Button type="primary" icon={<CheckOutlined/>}
                            onClick={() => handleAnswer(AnswerType.Accept)}>Принять</Button>
                    <Button type="default" danger icon={<CloseOutlined/>}
                            onClick={() => handleAnswer(AnswerType.Deny)}>Отклонить</Button>
                </div>
            </div>
            <AnswerInvitationModal invitation={invitation} answerType={answerType} dialog={answerInvitationDialog}/>
        </>
    );
};

export default InvitationItem;
