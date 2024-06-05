import './style.scss'
import ProfileDashboard from "./dashboards/profile/ProfileDashboard.tsx";
import AgencyDashboard from "./dashboards/agency/AgencyDashboard.tsx";
import InvitationDashboard from "./dashboards/invitation/InvitationDashboard.tsx";

const Profile = () => {
    return (
        <div className="profile-container">
            <ProfileDashboard/>
            <AgencyDashboard/>
            <InvitationDashboard/>
        </div>
    );
};

export default Profile;