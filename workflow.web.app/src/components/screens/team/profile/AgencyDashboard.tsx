import {FC} from "react";
import {useGetAgencyByUserQuery} from "../../../../store/apis/agencyApi.ts";
import {IUser} from "../../../../features/models/IUser.ts";
import AgencyDashboardItem from "./AgencyDashboardItem.tsx";

interface AgencyDashboardProfile {
    currentUser: IUser | null
}

const AgencyDashboard: FC<AgencyDashboardProfile> = ({currentUser}) => {
    const {data: agencies} = useGetAgencyByUserQuery(currentUser?.userId ?? 0, {skip: currentUser === null});

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
        </div>
    );
};

export default AgencyDashboard;