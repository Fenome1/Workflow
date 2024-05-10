import {FC} from "react";
import {Modal} from "antd";
import {useDeleteAgencyMutation} from "../../../../../../../../store/apis/agency/agencyApi.ts";
import "./style.scss";
import {IDialog} from "../../../../../../../../features/models/IDialog.ts";
import {useAppDispatch, useTypedSelector} from "../../../../../../../../store/hooks/hooks.ts";
import {selectAgency} from "../../../../../../../../store/slices/agencySlice.ts";
import {selectProject} from "../../../../../../../../store/slices/projectSlice.ts";

interface DeleteAgencyModalProps {
    agencyId: number;
    dialog: IDialog;
}

const DeleteAgencyModal: FC<DeleteAgencyModalProps> = ({dialog, agencyId}) => {
    const dispatch = useAppDispatch()
    const selectedAgencyId = useTypedSelector((state) => state.agency.selectedAgencyId)

    const [deleteAgency] = useDeleteAgencyMutation();

    const handleOk = async () => {
        try {
            await deleteAgency(agencyId);

            if (selectedAgencyId === agencyId) {
                await dispatch(selectAgency(null))
                await dispatch(selectProject(null))
            }

            dialog.close();
        } catch (error) {
            console.error('Ошибка при удалении агентства:', error);
        }
    };

    return (
        <Modal
            open={dialog.open}
            title="Подтверждение"
            onOk={() => handleOk()}
            onCancel={dialog.close}
            okText="Ок"
            cancelText="Отмена"
            okType="danger"
            centered
            footer={(_, {OkBtn, CancelBtn}) => (
                <>
                    <OkBtn/>
                    <CancelBtn/>
                </>
            )}>
            <div className="agency-delete-modal">
                <span className="agency-delete-modal-header">Хотите удалить агентство?</span>
                <div className="agency-delete-modal-content">
                    <div className="agency-delete-modal-description">
                        После удаления агентства, все сотрудники агентства будут расформированы!
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAgencyModal;
