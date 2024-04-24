import {FC} from 'react';
import {CalendarOutlined} from "@ant-design/icons";
import DeadlineColors from "../../../../../../common/DeadlineColors.ts";

interface DeadlineStickerProps {
    deadline: string;
}

const selectDeadlineColor = (differenceInDays: number): string => {
    if (differenceInDays <= 0) {
        return DeadlineColors.Overdue;
    } else if (differenceInDays <= 1) {
        return DeadlineColors.Tomorrow;
    } else if (differenceInDays <= 7) {
        return DeadlineColors.OnThisWeek;
    } else {
        return DeadlineColors.Far;
    }
};

const DeadlineStickerContent: FC<DeadlineStickerProps> = ({deadline}) => {
    const formattedDate = new Date(deadline);
    const currentDate = new Date();

    const differenceInDays = Math.ceil((formattedDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const color = selectDeadlineColor(differenceInDays);

    const formattedDateString = formattedDate.toLocaleDateString('ru-RU', {
        month: 'short',
        day: 'numeric',
        year: '2-digit'
    });

    return (
        <div className="objective-sticker" style={{background: color}}>
            <CalendarOutlined className="objective-sticker-icon"/>
            {formattedDateString}
        </div>
    );
};

export default DeadlineStickerContent;
