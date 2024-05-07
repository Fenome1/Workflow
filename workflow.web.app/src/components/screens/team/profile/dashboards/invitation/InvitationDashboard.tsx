import InvitationItem from "./InvitationItem.tsx";
import {FC} from "react";
import {useGetUserInvitationsQuery} from "../../../../../../store/apis/invitationApi.ts";
import {Empty, Skeleton} from "antd";

interface InvitationDashBoardProps {
    currentUserId?: number
}

const InvitationDashboard: FC<InvitationDashBoardProps> = ({currentUserId}) => {

    const {
        data: userInvitations,
        isLoading
    } = useGetUserInvitationsQuery(currentUserId ?? 0, {skip: currentUserId === undefined})

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