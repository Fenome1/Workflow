import {createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route} from "react-router-dom";
import LoginPage from "./components/screens/accounts/login/LoginPage.tsx";
import RegisterPage from "./components/screens/accounts/register/RegisterPage.tsx";
import Team from "./components/screens/team/Team.tsx";
import CurrentBoard from "./components/screens/team/current-board/CurrentBoard.tsx";
import RequireAuth from "./hok/RequireAuth.tsx";
import JoinAgency from "./components/screens/join/JoinAgency.tsx";
import {useAppDispatch, useTypedSelector} from "./store/hooks/hooks.ts";
import {useState} from "react";
import {signalRClient} from "./store/signalR/signalRClient.ts";

const Root = () => {
    const dispatch = useAppDispatch();
    const userState = useTypedSelector(state => state.user)
    const selectedAgencyId = useTypedSelector(state => state.agency.selectedAgencyId)

    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [connection, setConnection] =
        useState<signalR.HubConnection | null>(signalRClient(dispatch, userState, selectedAgencyId))

    return (
        <Outlet/>
    )
}

export const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Root/>}>
        <Route path="reg" element={<RegisterPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="team" element={<RequireAuth><Team/></RequireAuth>}/>
        <Route path="current-board" element={<RequireAuth><CurrentBoard/></RequireAuth>}/>
        <Route path="join/:token" element={<RequireAuth><JoinAgency/></RequireAuth>}/>
        <Route path="*" element={<Navigate to="/team" replace={true}/>}/>
    </Route>
))