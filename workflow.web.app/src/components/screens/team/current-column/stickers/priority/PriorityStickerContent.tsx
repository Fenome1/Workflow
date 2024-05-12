import {FC} from 'react';
import {IPriority} from "../../../../../../features/models/IPriority.ts";
import {Priorities} from "../../../../../../common/Priorities.ts";
import {RocketOutlined} from "@ant-design/icons";
import {IoSnowOutline} from "react-icons/io5";
import {PiCellSignalMediumFill} from "react-icons/pi";
import {PriorityColors, PriorityTextColors} from "../../../../../../common/Colors.ts";

interface PriorityStickerProps {
    priority: IPriority
}

type PriorityColorTuple = [background: string, color: string];

export const getPriorityColor = (priorityId: number): PriorityColorTuple => {
    switch (priorityId) {
        case Priorities.High:
            return [PriorityColors.High, PriorityTextColors.High];
        case Priorities.Medium:
            return [PriorityColors.Medium, PriorityTextColors.Medium];
        case Priorities.Low:
            return [PriorityColors.Low, PriorityTextColors.Low];
        default:
            return ['#000000', '#000000'];
    }
};

const PriorityStickerContent: FC<PriorityStickerProps> = ({priority}) => {
    const colors = getPriorityColor(priority.priorityId)

    return (
        <div className='objective-sticker' style={{
            backgroundColor: colors[0],
            color: colors[1],
            border: `1px ${colors[1]} dashed`
        }}>
            {priority.priorityId == Priorities.High &&
                <RocketOutlined className='objective-sticker-icon'/>
            }
            {priority.priorityId == Priorities.Medium &&
                <PiCellSignalMediumFill className='objective-sticker-icon'/>
            }
            {priority.priorityId == Priorities.Low &&
                <IoSnowOutline className='objective-sticker-icon'/>
            }
            {priority.name}
        </div>
    );
};

export default PriorityStickerContent;