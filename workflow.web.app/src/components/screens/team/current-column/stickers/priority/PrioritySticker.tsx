import {FC} from 'react';
import PrioritiesDropDown from "./PrioritiesDropDown.tsx";
import PriorityStickerContent from "./PriorityStickerContent.tsx";
import {IObjective} from "../../../../../../features/models/IObjective.ts";

interface PriorityStickerProps {
    objective: IObjective;
}

const PrioritySticker: FC<PriorityStickerProps> = ({objective}) => {
    return (
        <PrioritiesDropDown objective={objective}>
            <div>
                <PriorityStickerContent priority={objective.priority}/>
            </div>
        </PrioritiesDropDown>
    );
};

export default PrioritySticker;