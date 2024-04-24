import {IDialog} from "../../../../../features/models/IDialog.ts";
import {Modal} from "antd";
import {FC} from "react";
import {IObjective} from "../../../../../features/models/IObjective.ts";

interface AssignmentChangeModalProps {
    objective: IObjective
    dialog: IDialog
}

const AssignmentChangeModal: FC<AssignmentChangeModalProps> = ({dialog, objective}) => {
    return (
        <Modal open={dialog.open} centered onCancel={dialog.close}>
        </Modal>
    );
};

export default AssignmentChangeModal;