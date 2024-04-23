import RegisterForm from "./RegisterForm.tsx";
import FooteredPage from "../../../ui/footer/FooteredPage.tsx";
import {AppColors} from "../../../../common/AppColors.ts";

const RegisterPage = () => {
    return (
        <div style={{background: AppColors.Primary}}>
            <FooteredPage>
                <RegisterForm/>
            </FooteredPage>
        </div>
    );
};

export default RegisterPage;