import {FC} from 'react';
import {IPriority} from "../../../../../../features/models/IPriority.ts";
import {Priorities} from "../../../../../../common/Priorities.ts";
import {RocketOutlined} from "@ant-design/icons";
import {PriorityColors} from "../../../../../../common/PriorityColors.ts";
import {IoSnowOutline} from "react-icons/io5";
import {PiCellSignalMediumFill} from "react-icons/pi";

interface PriorityStickerProps {
    priority: IPriority | null
}

const PriorityStickerContent: FC<PriorityStickerProps> = ({priority}) => {
    const getColor = (priorityId: number): string => {
        switch (priorityId) {
            case Priorities.High:
                return PriorityColors.High;
            case Priorities.Medium:
                return PriorityColors.Medium;
            case Priorities.Low:
                return PriorityColors.Low;
            default:
                return 'black';
        }
    };

    return (
        priority &&
        <div className='objective-sticker' style={{
            backgroundColor: getColor(priority.priorityId)
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