import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import LoginPage from "./components/screens/login/LoginPage.tsx";
import RegisterPage from "./components/screens/register/RegisterPage.tsx";


export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route>
            <Route path='reg' element={<RegisterPage/>}/>
            <Route index path='login' element={<LoginPage/>}/>

            <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
        </Route>
    ])
)