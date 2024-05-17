import InvitationItem from "./InvitationItem.tsx";
import {useGetUserInvitationsQuery} from "../../../../../../store/apis/invitation/invitationApi.ts";
import {Empty, Skeleton} from "antd";
import {useTypedSelector} from "../../../../../../store/hooks/hooks.ts";

const InvitationDashboard = () => {
    const { user } = useTypedSelector(state => state.user)

    const {
        data: userInvitations,
        isLoading
    } = useGetUserInvitationsQuery(user?.userId ?? 0, {
        skip: user === null
    })

    return (
        <div className="invitation-dashboard-container">
            <div className="dashboard-header">
                <span className="dashboard-header-title">Приглашения</span>
            </div>
            <div className="invitation-dashboard-content">
                {isLoading ? (
                    <Skeleton active paragraph={{rows: 1}} round style={{padding: '10px'}}/>
                ) : userInvitations && userInvitations.length > 0 ? (
                    userInvitations.map((userInvitation) => <InvitationItem key={userInvitation.invitationId}
                                                                            invitation={userInvitation}/>)
                ) : (
                    <Empty style={{padding: '10px'}} description="Приглашения не найдены"/>
                )}
            </div>
        </div>
    );
};

export default InvitationDashboard;