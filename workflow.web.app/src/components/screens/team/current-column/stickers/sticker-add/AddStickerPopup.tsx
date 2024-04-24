import {FC} from 'react';
import {IObjective} from "../../../../../../features/models/IObjective.ts";
import {Button, Popover} from "antd";
import DeadlineDropDown from "../deadline/DeadlineDropDown.tsx";
import PrioritiesDropDown from "../priority/PrioritiesDropDown.tsx";
import './style.scss'
import {IDialog} from "../../../../../../features/models/IDialog.ts";

interface AddStickerPopupProps {
    objective: IObjective
    dialog: IDialog
}

const AddStickerPopup: FC<AddStickerPopupProps> = ({objective, dialog}) => {

    return (
        <div>
            <Popover open={dialog.open} arrow={false} onOpenChange={dialog.close} content={
                <div className='stickers-add-popup-container'>
                    <span className='stickers-add-popup-title'>Редактировать</span>
                    <PrioritiesDropDown objective={objective}>
                        <Button className='stickers-add-button'>Приоритет</Button>
                    </PrioritiesDropDown>
                    <DeadlineDropDown objective={objective}>
                        <Button className='stickers-add-button'>Дедлайн</Button>
                    </DeadlineDropDown>
                </div>
            }>
            </Popover>
        </div>
    );
};

export default AddStickerPopup;