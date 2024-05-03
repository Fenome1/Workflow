import {IAgency} from "../../../../features/models/IAgency.ts";
import {FC} from "react";
import {IUser} from "../../../../features/models/IUser.ts";
import {DeleteOutlined, EditOutlined, ProductFilled, ProductOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../hok/useDialog.ts";
import DeleteAgencyModal from "./modals/DeleteAgencyModal.tsx";

interface AgencyDashboardItemProps {
    agency: IAgency
    currentUser: IUser | null
}

const AgencyDashboardItem: FC<AgencyDashboardItemProps> = ({agency, currentUser}) => {

    const isOwnedAgency = currentUser?.userId === agency.ownerId;

    const deleteAgencyDialog = useDialog()

    return (
        <div className='agency-dashboard-container'>
            <div className='agency-dashboard-header'>
                {isOwnedAgency ? <ProductFilled className='agency-dashboard-icon'/> :
                    <ProductOutlined className='agency-dashboard-icon'/>}
                <span className='agency-dashboard-name'>{agency.name}</span>
            </div>
            {isOwnedAgency && <div className='agency-dashboard-buttons'>
                <EditOutlined className='agency-dashboard-button'/>
                <DeleteOutlined className='agency-dashboard-button-delete' onClick={deleteAgencyDialog.show}/>
            </div>}
            <DeleteAgencyModal agencyId={agency.agencyId} dialog={deleteAgencyDialog}/>
        </div>
    );
};

export default AgencyDashboardItem;