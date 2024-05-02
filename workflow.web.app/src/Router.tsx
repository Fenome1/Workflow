import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import LoginPage from "./components/screens/accounts/login/LoginPage.tsx";
import RegisterPage from "./components/screens/accounts/register/RegisterPage.tsx";
import Team from "./components/screens/team/Team.tsx";
import CurrentBoard from "./components/screens/team/current-board/CurrentBoard.tsx";
import RequireAuth from "./hok/RequireAuth.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route>
            <Route path='reg' element={<RegisterPage/>}/>
            <Route index path='login' element={<LoginPage/>}/>

            <Route path='team' element={<RequireAuth>
                <Team/>
            </RequireAuth>}/>

            <Route path='current-board' element={<RequireAuth>
                <CurrentBoard/>
            </RequireAuth>}/>

            <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
        </Route>
    ])
)