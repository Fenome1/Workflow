import LoginForm from "./LoginForm.tsx";
import FooteredPage from "../../../ui/footer/FooteredPage.tsx";
import {AppColors} from "../../../../common/Colors.ts";

const LoginPage = () => {
    return (
        <div style={{background: AppColors.Primary}}>
            <FooteredPage>
                <LoginForm/>
            </FooteredPage>
        </div>
    );
};

export default LoginPage;