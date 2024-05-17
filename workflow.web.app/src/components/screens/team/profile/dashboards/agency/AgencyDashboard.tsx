import {useEffect, useState} from "react";
import {useGetAgencyByUserQuery} from "../../../../../../store/apis/agency/agencyApi.ts";
import AgencyItem from "./AgencyItem.tsx";
import {Button, Skeleton} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDialog} from "../../../../../../hok/useDialog.ts";
import CreateAgencyModal from "./modals/modals/CreateAgencyModal.tsx";
import {useTypedSelector} from "../../../../../../store/hooks/hooks.ts";

const AgencyDashboard = () => {
    const { user} = useTypedSelector(state => state.user)

    const {data: agencies, isLoading} = useGetAgencyByUserQuery(user?.userId ?? 0, {
        skip: user === null
    });

    const createAgencyDialog = useDialog()

    const [isAgencyLast, setIsAgencyLast] = useState<boolean>(false);

    useEffect(() => {
        if (!agencies)
            return

        setIsAgencyLast(
            agencies?.filter((a) => a.ownerId === user?.userId).length <= 1
        );
    }, [agencies, user]);

    return (
        <div className="agencies-dashboard-container">
            <div className='dashboard-header'>
                <span className='dashboard-header-title'>Настройка агентств</span>
            </div>
            <div className='agency-dashboard-content'>
                {isLoading ? (<Skeleton active paragraph={{rows: 1}} round style={{padding: '10px'}}/>)
                    :
                    agencies && agencies.length > 0 && agencies.map((agency) =>
                        <AgencyItem key={agency.agencyId}
                                    agency={agency}
                                    currentUser={user}
                                    isAgencyLast={isAgencyLast}/>)
                }
            </div>
            {isLoading ? (<Skeleton.Button active shape={'round'} className='agency-create-button'/>)
                : <Button type='link'
                          icon={<PlusOutlined/>}
                          className='agency-create-button'
                          onClick={createAgencyDialog.show}>Создать агентство</Button>
            }
            <CreateAgencyModal dialog={createAgencyDialog} userId={user?.userId}/>
        </div>
    );
};

export default AgencyDashboard;