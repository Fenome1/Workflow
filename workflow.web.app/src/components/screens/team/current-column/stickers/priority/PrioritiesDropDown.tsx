import {Dropdown, MenuProps, message} from "antd";
import {FC} from "react";
import {useGetPriorityQuery} from "../../../../../../store/apis/priorityApi.ts";
import {DeleteOutlined} from "@ant-design/icons";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useUpdateObjectiveMutation} from "../../../../../../store/apis/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {IObjective} from "../../../../../../features/models/IObjective.ts";

interface PrioritiesDropDownProps {
    children: React.ReactNode
    objective: IObjective
}

const PrioritiesDropDown: FC<PrioritiesDropDownProps> = ({children, objective}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const {data: priorities} = useGetPriorityQuery()

    const items: MenuProps['items'] = priorities?.map((priority) => ({
        key: priority.priorityId,
        label: priority.name,
        onClick: () => updatePriority(priority.priorityId)
    }));

    const deleteOption: ItemType = {
        key: 0,
        label: "Открепить",
        danger: true,
        icon: <DeleteOutlined/>,
        onClick: () => updatePriority(0)
    };

    items?.push(deleteOption)

    const updatePriority = async (priorityId: number | null) => {
        if (priorityId === objective.priority?.priorityId) {
            message.info(`${objective.priority.name} приоритет уже задан`)
            return;
        }

        const updateData: IUpdateObjectiveCommand = {
            objectiveId: objective.objectiveId
        };

        if (priorityId === 0) {
            updateData.isPriorityReset = true;
        } else {
            updateData.priorityId = priorityId ?? 0;
        }

        await updateObjective(updateData);
    };

    return (
        <Dropdown menu={{items}} trigger={['click']}>
            {children}
        </Dropdown>
    );
};

export default PrioritiesDropDown;