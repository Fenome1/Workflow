import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {connection} from "../store/signalRClient.ts";

const useAuth = () => {
    const navigate = useNavigate();

    const startConnection = useCallback(() => {
        connection
            .start()
            .then(() => console.log("Connection started"))
            .catch((err) => console.error(err.toString()));
    }, []);

    const navigateToTeamPage = () => navigate("/team");

    return { startConnection, navigateToTeamPage };
};

export default useAuth;
