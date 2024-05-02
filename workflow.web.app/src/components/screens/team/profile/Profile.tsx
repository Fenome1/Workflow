import './style.scss'
import ProfileDashboard from "./ProfileDashboard.tsx";

const Profile = () => {
    return (
        <div className="profile-container">
            <ProfileDashboard/>
            <div className="agencies-dashboard-container">
                Работа с агентством
            </div>
        </div>
    );
};

export default Profile;