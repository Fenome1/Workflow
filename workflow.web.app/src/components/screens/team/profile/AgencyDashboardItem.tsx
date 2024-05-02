import {IAgency} from "../../../../features/models/IAgency.ts";
import {FC} from "react";
import {IUser} from "../../../../features/models/IUser.ts";
import {EditOutlined, ProductOutlined} from "@ant-design/icons";

interface AgencyDashboardItemProps {
    agency: IAgency
    currentUser: IUser | null
}

const AgencyDashboardItem: FC<AgencyDashboardItemProps> = ({agency, currentUser}) => {

    return (
        <div className='agency-dashboard-container'>
            <div className='agency-dashboard-header'>
                <ProductOutlined className='agency-dashboard-icon'/>
                <span className='agency-dashboard-name'>{agency.name}</span>
                {currentUser?.userId === agency.ownerId && <span> (Владелец)</span>}
            </div>
            <div className='agency-dashboard-buttons'>
                <EditOutlined/>
            </div>
        </div>
    );
};

export default AgencyDashboardItem;