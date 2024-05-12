import {FC} from 'react';
import {CalendarOutlined} from "@ant-design/icons";
import {DeadlineColors, DeadlineTextColors} from "../../../../../../common/Colors.ts";

interface DeadlineStickerProps {
    deadline: string;
}

export const selectDeadlineColor = (differenceInDays: number): [background: string, color: string] => {
    if (differenceInDays <= 0) {
        return [DeadlineColors.Overdue, DeadlineTextColors.Overdue];
    } else if (differenceInDays <= 1) {
        return [DeadlineColors.Tomorrow, DeadlineTextColors.Tomorrow];
    } else if (differenceInDays <= 7) {
        return [DeadlineColors.OnThisWeek, DeadlineTextColors.OnThisWeek];
    } else {
        return [DeadlineColors.Far, DeadlineTextColors.Far];
    }
};

const DeadlineStickerContent: FC<DeadlineStickerProps> = ({deadline}) => {
    const formattedDate = new Date(deadline);
    const currentDate = new Date();

    const differenceInDays = Math.ceil((formattedDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const [backgroundColor, color] = selectDeadlineColor(differenceInDays);

    const formattedDateString = formattedDate.toLocaleDateString('ru-RU', {
        month: 'short',
        day: 'numeric',
        year: '2-digit'
    });

    return (
        <div className="objective-sticker"
             style={{background: backgroundColor, color: color, border: `${color} 1px dashed`}}>
            <CalendarOutlined className="objective-sticker-icon"/>
            {formattedDateString}
        </div>
    );
};

export default DeadlineStickerContent;
