import {FC} from 'react';
import './style.scss'
import {IUser} from "../../../../../../features/models/IUser.ts";
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {Checkbox} from "antd";
import {useAssignifyUserToObjectiveMutation} from "../../../../../../store/apis/objectiveApi.ts";
import {
    IAssignifyUserToObjectiveCommand
} from "../../../../../../features/commands/objective/IAssignifyUserToObjectiveCommand.ts";
import {AssignifyType} from "../../../../../../common/AssignifyType.ts";

interface AssignmentUserItemProps {
    user: IUser
    objective: IObjective
}

const AssignmentUserItem: FC<AssignmentUserItemProps> = ({user, objective}) => {
    const [updateAssignifyUserToObjective] = useAssignifyUserToObjectiveMutation()
    const isChecked = () => (objective.users?.some(u => u.userId === user.userId));

    const updateHandle = async () => {
        const assignifyType = isChecked() ? AssignifyType.Unassign : AssignifyType.Assign;

        const updateAssinifyCommand: IAssignifyUserToObjectiveCommand = {
            objectiveId: objective.objectiveId,
            userId: user.userId,
            assignifyType: assignifyType,
        }

        await updateAssignifyUserToObjective(updateAssinifyCommand);
    }
    return (
        <div className='executor-item' key={user.userId}>
            <Checkbox checked={isChecked()} onClick={updateHandle}></Checkbox>
            {user.email}
        </div>
    );
};

export default AssignmentUserItem;