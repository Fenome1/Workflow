import {IDialog} from "../../../../../../features/models/IDialog.ts";
import {Button, Empty, Input, Modal} from "antd";
import {FC, useState} from "react";
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {useGetUsersByAgencyQuery} from "../../../../../../store/apis/user/userApi.ts";
import {useTypedSelector} from "../../../../../../store/hooks/hooks.ts";
import './style.scss'
import AssignmentUserItem from "./AssignmentUserItem.tsx";
import {useAssignifyUserToObjectiveMutation} from "../../../../../../store/apis/objective/objectiveApi.ts";
import {
    IAssignifyUserToObjectiveCommand
} from "../../../../../../features/commands/objective/IAssignifyUserToObjectiveCommand.ts";
import {AssignifyType} from "../../../../../../common/AssignifyType.ts";

interface AssignmentChangeModalProps {
    objective: IObjective
    dialog: IDialog
}

const AssignmentChangeModal: FC<AssignmentChangeModalProps> = ({dialog, objective}) => {
    const currentAgencyId = useTypedSelector((state) => state.agency).selectedAgencyId
    const {data: agencyUsers} = useGetUsersByAgencyQuery(currentAgencyId ?? 0, {skip: currentAgencyId === null})

    const isAnyChecked = objective.users?.some(user =>
        agencyUsers?.some(agencyUser => agencyUser.userId === user.userId)
    );
    const [updateAssignifyUserToObjective] = useAssignifyUserToObjectiveMutation()

    const [searchText, setSearchText] = useState('');

    const filteredUsers = agencyUsers?.filter(user =>
        user.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        user.email.toLowerCase().startsWith(searchText.toLowerCase())
    );

    const handleClose = () => {
        dialog.close()
        setSearchText('')
    }

    const handleDeleteAll = () => {
        agencyUsers?.forEach(async user => {
            const userExists = objective.users?.some(objectiveUser => objectiveUser.userId === user.userId);

            if (userExists) {
                const updateAssinifyCommand: IAssignifyUserToObjectiveCommand = {
                    objectiveId: objective.objectiveId,
                    userId: user.userId,
                    assignifyType: AssignifyType.Unassign,
                }
                await updateAssignifyUserToObjective(updateAssinifyCommand)
            }
        });
    }

    return (
        <Modal open={dialog.open} centered onCancel={handleClose} title='Исполнители' onOk={handleClose}
               footer={(_, {OkBtn}) => (
                   <>
                       {isAnyChecked &&
                           <Button danger onClick={handleDeleteAll}>
                               Снять всех исполнителей
                           </Button>}
                       <OkBtn/>
                   </>
               )}>
            <div className='executors-modal-container'>
                <Input placeholder='Поиск по списку'
                       value={searchText}
                       size='large'
                       onChange={(e) => setSearchText(e.target.value)} className='executors-modal-search'></Input>
                <div className='executors-modal-users-list'>
                    {filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <AssignmentUserItem key={user.userId} user={user} objective={objective}/>
                        ))
                    ) : (
                        <Empty description='Исполнители не найдены...'/>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default AssignmentChangeModal;