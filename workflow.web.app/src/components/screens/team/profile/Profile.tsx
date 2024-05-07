import './style.scss'
import ProfileDashboard from "./dashboards/profile/ProfileDashboard.tsx";
import AgencyDashboard from "./dashboards/agency/AgencyDashboard.tsx";
import {IUserState} from "../../../../store/slices/userSlice.ts";
import {FC} from "react";
import InvitationDashboard from "./dashboards/invitation/InvitationDashboard.tsx";

interface ProfileProps {
    userState: IUserState
}

const Profile: FC<ProfileProps> = ({userState}) => {
    return (
        <div className="profile-container">
            <ProfileDashboard userState={userState}/>
            <AgencyDashboard currentUser={userState.user}/>
            <InvitationDashboard currentUserId={userState.user?.userId}/>
        </div>
    );
};

export default Profile;