import {IDialog} from "../../../../../../../../../features/models/IDialog.ts";
import {Modal, Tabs,} from "antd";
import {FC} from "react";
import TabPane from "antd/es/tabs/TabPane";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import './style.scss'
import AgencyInviteForm from "./AgencyInviteForm.tsx";
import AgencyCreateLinkForm from "./AgencyCreateLinkForm.tsx";
import InvitationsTable from "./InvitationsTable.tsx";


interface InviteEmployeeModalProps {
    dialog: IDialog
    agency?: IAgency
}

const InviteEmployeeModal: FC<InviteEmployeeModalProps> = ({dialog, agency}) => {

    return (
        <Modal
            className='agency-settings-modal'
            centered
            open={dialog.open}
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            title='Приглашение'
            footer={null}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="По email" key="1">
                    <AgencyInviteForm agency={agency}/>
                </TabPane>
                <TabPane tab="По ссылке" key="2">
                    <AgencyCreateLinkForm agency={agency}/>
                </TabPane>
                <TabPane tab="Отправленные" key="3">
                    <InvitationsTable agency={agency}/>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default InviteEmployeeModal;