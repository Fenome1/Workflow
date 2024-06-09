import {useNavigate} from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();

    const navigateToTeamPage = () => navigate("/team");

    return {navigateToTeamPage};
};

export default useAuth;
