import {FC} from "react";
import {useGetAgencyByUserQuery} from "../../../../../../store/apis/agencyApi.ts";
import {IUser} from "../../../../../../features/models/IUser.ts";
import AgencyDashboardItem from "./AgencyDashboardItem.tsx";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import CreateAgencyModal from "./modals/CreateAgencyModal.tsx";

interface AgencyDashboardProfile {
    currentUser: IUser | null
}

const AgencyDashboard: FC<AgencyDashboardProfile> = ({currentUser}) => {

    const {data: agencies} = useGetAgencyByUserQuery(currentUser?.userId ?? 0, {skip: currentUser === null});

    const createAgencyDialog = useDialog()

    return (
        <div className="agencies-dashboard-container">
            <div className='agencies-dashboard-header'>
                <span className='agencies-dashboard-header-title'>Настройка агентств</span>
            </div>
            <div className='agency-dashboard-content'>
                {
                    agencies && agencies.length > 0 && agencies.map((agency) =>
                        <AgencyDashboardItem key={agency.agencyId} agency={agency} currentUser={currentUser}/>)
                }
            </div>
            <Button type='link'
                    icon={<PlusOutlined/>}
                    className='agency-create-button'
                    onClick={createAgencyDialog.show}>Создать агентство</Button>
            <CreateAgencyModal dialog={createAgencyDialog} userId={currentUser?.userId}/>
        </div>
    );
};

export default AgencyDashboard;