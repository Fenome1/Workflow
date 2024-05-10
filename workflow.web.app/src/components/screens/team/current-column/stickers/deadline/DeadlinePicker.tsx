import {Button, Calendar, message, Popover} from "antd";
import {FC, useState} from "react";
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {useUpdateObjectiveMutation} from "../../../../../../store/apis/objective/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {Dayjs} from "dayjs";
import {IDialog} from "../../../../../../features/models/IDialog.ts";

interface DeadlinePickerProps {
    objective: IObjective
    dialog: IDialog
}

const DeadlinePicker: FC<DeadlinePickerProps> = ({objective, dialog}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const [selectedDate, setSelectedDate] = useState<string | null>(objective.deadline);

    const handleSave = async () => {
        if (selectedDate !== null) {
            if (selectedDate === objective.deadline) {
                message.info("Дата уже выбрана")
                return
            }

            const updatedObjective: IUpdateObjectiveCommand =
                {objectiveId: objective.objectiveId, deadline: selectedDate};

            await updateObjective(updatedObjective);
        }
        dialog.close();
    };

    const handleReset = async () => {
        const updateData: IUpdateObjectiveCommand = {
            objectiveId: objective.objectiveId,
            isDeadlineReset: true,
        };

        await updateObjective(updateData);
    };

    const onDateSelect = (date: Dayjs) => {
        setSelectedDate(date.format('YYYY-MM-DD'))
    };

    const handleOpenChange = () => {
        dialog.close();
    };

    return (
        <Popover
            className="deadline-picker"
            placement="bottomRight"
            arrow={false}
            open={dialog.open}
            onOpenChange={handleOpenChange}
            content={
                <div className="deadline-picker-container">
                    <Calendar style={{width: 300}} fullscreen={false} onSelect={onDateSelect}/>
                    <div className="deadline-picker-buttons-container">
                        <Button type="primary" onClick={handleSave}>
                            Сохранить
                        </Button>
                        <Button danger type='link' onClick={handleReset}>
                            Открепить
                        </Button>
                    </div>
                </div>
            }>
            <div></div>
        </Popover>
    );
};

export default DeadlinePicker;