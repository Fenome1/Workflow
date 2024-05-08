import {FC} from 'react';
import {Modal, Tabs} from "antd";
import {IAgency} from "../../../../../../../features/models/IAgency.ts";
import {IDialog} from "../../../../../../../features/models/IDialog.ts";
import './style.scss';
import TabPane from 'antd/es/tabs/TabPane';
import Employees from "./employees/Employees.tsx";
import Projects from "./projects/Projects.tsx";

interface SettingsAgencyModal {
    agency: IAgency
    dialog: IDialog
    currentUserId?: number
}

const SettingsAgencyModal: FC<SettingsAgencyModal> = ({dialog, agency, currentUserId}) => {

    const isOwnedAgency = currentUserId === agency.ownerId;

    return (
        <Modal
            className='agency-settings-modal'
            centered
            open={dialog.open}
            title={`Агентство "${agency.name}"`}
            onCancel={dialog.close}
            okText='Ок'
            cancelText='Отмена'
            footer={null}>
            <div className='settings-agency-description-container'>
                <span className='settings-agency-description-content'>{agency.description}</span>
            </div>
            <Tabs>
                {isOwnedAgency &&
                    <TabPane tab="Сотрудники" key="1">
                        <Employees agency={agency} currentUserId={currentUserId}></Employees>
                    </TabPane>
                }
                <TabPane tab="Проекты" key="2">
                    <Projects agency={agency}></Projects>
                </TabPane>
            </Tabs>
        </Modal>
    );
};


export default SettingsAgencyModal;