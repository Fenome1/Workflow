import DeadlineStickerContent from "./DeadlineStickerContent.tsx";
import {FC} from "react";
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import DeadlineDropDown from "./DeadlineDropDown.tsx";

interface DeadlineStickerProps {
    objective: IObjective
}

const DeadlineSticker: FC<DeadlineStickerProps> = ({objective}) => {
    return (
        <DeadlineDropDown objective={objective}>
            <div>
                <DeadlineStickerContent deadline={objective.deadline!}/>
            </div>
        </DeadlineDropDown>
    );
};

export default DeadlineSticker;