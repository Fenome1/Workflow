import {Button, Modal} from "antd";
import {AnswerType} from "../../../../../../../common/AnswerType.ts";
import {IInvitation} from "../../../../../../../features/models/IInvitation.ts";
import {useAnswerInvitationMutation} from "../../../../../../../store/apis/invitationApi.ts";
import {
    IAnswerOnInvitationCommand
} from "../../../../../../../features/commands/invitation/IAnswerOnInvitationCommand.ts";
import {FC} from "react";
import {IDialog} from "../../../../../../../features/models/IDialog.ts";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import AvatarItem from "../../../../../../ui/AvatarItem.tsx";
import './style.scss'


interface AnswerInvitationModalProps {
    invitation: IInvitation
    answerType?: AnswerType
    dialog: IDialog
}

const AnswerInvitationModal: FC<AnswerInvitationModalProps> = ({invitation, answerType, dialog}) => {
    const [answerInvitation] = useAnswerInvitationMutation()
    const invitationActionText = `приглашение агентства "${invitation.agencyName}"`;
    const owner = invitation.owner

    const handleAnswerUser = async () => {
        console.log(answerType)

        if (answerType === undefined)
            return

        console.log(answerType)

        const command: IAnswerOnInvitationCommand = {
            invitationId: invitation.invitationId,
            answerType: answerType
        }

        await answerInvitation(command)

        dialog.close()
    }

    return (
        <Modal
            open={dialog.open}
            title="Подтверждение"
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            centered={true}
            footer={(_, {CancelBtn}) => (
                <>
                    {answerType === AnswerType.Accept ?
                        <Button type='primary' icon={<CheckOutlined/>} onClick={handleAnswerUser}>Принять</Button>
                        : <Button type='primary' danger icon={<CloseOutlined/>}
                                  onClick={handleAnswerUser}>Отклонить</Button>}
                    <CancelBtn/>
                </>
            )}>
            <div className='invitation-item-modal'>
                <p className='invitation-item-description'>
                    {answerType === AnswerType.Accept ?
                        `Принять ${invitationActionText}?`
                        : `Отклонить ${invitationActionText}?`}
                </p>
                <div className='invitation-owner-container'>
                    <div className='invitation-owner-title'>
                        Владелец -
                    </div>
                    <div className='invitation-owner-content'>
                        <AvatarItem user={invitation.owner}/>
                        <span>{owner.email}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AnswerInvitationModal;