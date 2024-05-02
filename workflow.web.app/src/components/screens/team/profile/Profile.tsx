import './style.scss'
import ProfileDashboard from "./ProfileDashboard.tsx";
import AgencyDashboard from "./AgencyDashboard.tsx";
import {IUserState} from "../../../../store/slices/userSlice.ts";
import {FC} from "react";

interface ProfileProps {
    userState: IUserState
}

const Profile: FC<ProfileProps> = ({userState}) => {
    return (
        <div className="profile-container">
            <ProfileDashboard userState={userState}/>
            <AgencyDashboard currentUser={userState.user}/>
        </div>
    );
};

export default Profile;