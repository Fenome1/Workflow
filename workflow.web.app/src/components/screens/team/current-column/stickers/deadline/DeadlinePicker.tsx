import {Button, Calendar, Popover} from "antd";
import {FC, useState} from "react";
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {useUpdateObjectiveMutation} from "../../../../../../store/apis/objectiveApi.ts";
import {IUpdateObjectiveCommand} from "../../../../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {Dayjs} from "dayjs";

interface DeadlinePickerProps {
    open: boolean;
    setOpen: (visible: boolean) => void;
    objective: IObjective;
    handleReset: () => Promise<void>;
}

const DeadlinePicker: FC<DeadlinePickerProps> = ({open, setOpen, objective, handleReset}) => {
    const [updateObjective] = useUpdateObjectiveMutation();
    const [selectedDate, setSelectedDate] = useState<string | null>(objective.deadline!);

    const handleSave = async () => {
        if (selectedDate !== null) {
            const updatedObjective: IUpdateObjectiveCommand =
                {objectiveId: objective.objectiveId, deadline: selectedDate};
            await updateObjective(updatedObjective);
        }
        setOpen(false);
    };

    const onDateSelect = (date: Dayjs) => {
        setSelectedDate(date.format('YYYY-MM-DD'))
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            className="deadline-picker"
            placement="bottomRight"
            arrow={false}
            open={open}
            onOpenChange={handleOpenChange}
            content={
                <div className="deadline-picker-container">
                    <Calendar style={{width: 300}} fullscreen={false} onSelect={onDateSelect}/>
                    <div className="deadline-picker-buttons-container">
                        <Button type="primary" onClick={handleSave}>
                            Сохранить
                        </Button>
                        <Button danger onClick={handleReset}>
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