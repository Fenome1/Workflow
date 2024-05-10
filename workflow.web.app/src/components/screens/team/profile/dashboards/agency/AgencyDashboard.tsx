import {FC} from "react";
import {useGetAgencyByUserQuery} from "../../../../../../store/apis/agency/agencyApi.ts";
import {IUser} from "../../../../../../features/models/IUser.ts";
import AgencyItem from "./AgencyItem.tsx";
import {Button, Skeleton} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import CreateAgencyModal from "./modals/modals/CreateAgencyModal.tsx";

interface AgencyDashboardProfile {
    currentUser: IUser | null
}

const AgencyDashboard: FC<AgencyDashboardProfile> = ({currentUser}) => {

    const {data: agencies, isLoading} = useGetAgencyByUserQuery(currentUser?.userId ?? 0, {skip: currentUser === null});

    const createAgencyDialog = useDialog()

    return (
        <div className="agencies-dashboard-container">
            <div className='dashboard-header'>
                <span className='dashboard-header-title'>Настройка агентств</span>
            </div>
            <div className='agency-dashboard-content'>
                {isLoading ? (<Skeleton active paragraph={{rows: 1}} round style={{padding: '10px'}}/>)
                    :
                    agencies && agencies.length > 0 && agencies.map((agency) =>
                        <AgencyItem key={agency.agencyId} agency={agency} currentUser={currentUser}/>)
                }
            </div>
            {isLoading ? (<Skeleton.Button active shape={'round'} className='agency-create-button'/>)
                : <Button type='link'
                          icon={<PlusOutlined/>}
                          className='agency-create-button'
                          onClick={createAgencyDialog.show}>Создать агентство</Button>
            }
            <CreateAgencyModal dialog={createAgencyDialog} userId={currentUser?.userId}/>
        </div>
    );
};

export default AgencyDashboard;