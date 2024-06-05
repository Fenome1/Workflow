import {FC, ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useTypedSelector} from "../store/hooks/hooks.ts";

interface RequireAuthProps {
    children: ReactNode
}

const RequireAuth: FC<RequireAuthProps> = ({children}) => {
    const location = useLocation()
    const {user} = useTypedSelector((state) => state.user)

    if (!user) {
        return <Navigate to='/login' state={{form: location}}/>
    }

    return children
};

export default RequireAuth;