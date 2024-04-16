import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import LoginPage from "./components/screens/accounts/login/LoginPage.tsx";
import RegisterPage from "./components/screens/accounts/register/RegisterPage.tsx";
import Team from "./components/screens/main/Team.tsx";
import CurrentBoard from "./components/screens/main/board/CurrentBoard.tsx";


export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route>
            <Route path='reg' element={<RegisterPage/>}/>
            <Route index path='login' element={<LoginPage/>}/>

            <Route path='team' element={<Team/>}/>
            <Route path='current-board' element={<CurrentBoard/>}/>

            <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
        </Route>
    ])
)