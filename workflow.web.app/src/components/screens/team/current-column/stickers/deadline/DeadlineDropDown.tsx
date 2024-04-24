import React, {FC, useState} from 'react';
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {Dropdown, MenuProps} from "antd";
import DeadlinePicker from "./DeadlinePicker.tsx";
import './style.scss'
import {IUpdateObjectiveCommand} from "../../../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {useUpdateObjectiveMutation} from "../../../../../../store/apis/objectiveApi.ts";

interface DeadlineDatePickerProps {
    children: React.ReactNode
    objective: IObjective
}

const DeadlineDropDown: FC<DeadlineDatePickerProps> = ({children, objective}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const [visible, setVisible] = useState(false);

    const resetDeadline = async () => {
        const updateData: IUpdateObjectiveCommand = {
            objectiveId: objective.objectiveId,
            isDeadlineReset: true,
        };

        await updateObjective(updateData);
    };

    const handleMenuClick = async (key: string) => {
        if (key === 'change') {
            setVisible(true);
        } else if (key === 'reset') {
            await resetDeadline()
        }
    };

    const items: MenuProps['items'] = [
        {
            key: 'change',
            label: "Изменить",
            onClick: () => handleMenuClick('change'),
        },
        {
            key: 'reset',
            label: "Открепить",
            danger: true,
            onClick: () => handleMenuClick('reset'),
        }]

    return (
        <div>
            <Dropdown menu={{items}} trigger={['click']} open={visible ? false : undefined}>
                {children}
            </Dropdown>
            <DeadlinePicker objective={objective} open={visible} setOpen={setVisible} handleReset={resetDeadline} />
        </div>
    );
};

export default DeadlineDropDown;