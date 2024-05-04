import {IAgency} from "../../../../../../features/models/IAgency.ts";
import {FC} from "react";
import {IUser} from "../../../../../../features/models/IUser.ts";
import {DeleteOutlined, EditOutlined, ProductFilled, ProductOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import DeleteAgencyModal from "./modals/DeleteAgencyModal.tsx";
import UpdateAgencyModal from "./modals/UpdateAgencyModal.tsx";
import SettingsAgencyModal from "./modals/SettingsAgencyModal.tsx";

interface AgencyDashboardItemProps {
    agency: IAgency
    currentUser: IUser | null
}

const AgencyDashboardItem: FC<AgencyDashboardItemProps> = ({agency, currentUser}) => {

    const isOwnedAgency = currentUser?.userId === agency.ownerId;

    const deleteAgencyDialog = useDialog()
    const updateAgencyDialog = useDialog()
    const settingAgencyDialog = useDialog()

    return (
        <>
            <div className='agency-dashboard-container' onClick={settingAgencyDialog.show}>
                <div className='agency-dashboard-header'>
                    {isOwnedAgency ? <ProductFilled className='agency-dashboard-icon'/> :
                        <ProductOutlined className='agency-dashboard-icon'/>}
                    <span className='agency-dashboard-name'>{agency.name}</span>
                </div>
                {isOwnedAgency && <div className='agency-dashboard-buttons'>
                    <EditOutlined className='agency-dashboard-button' onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateAgencyDialog.show()
                    }}/>
                    <DeleteOutlined className='agency-dashboard-button-delete' onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteAgencyDialog.show()
                    }}/>
                </div>}
            </div>
            <DeleteAgencyModal agencyId={agency.agencyId} dialog={deleteAgencyDialog}/>
            <UpdateAgencyModal dialog={updateAgencyDialog} agency={agency}/>
            <SettingsAgencyModal agency={agency} dialog={settingAgencyDialog} currentUserId={currentUser?.userId}/>
        </>

    );
};

export default AgencyDashboardItem;