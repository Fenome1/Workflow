import RegisterForm from "./RegisterForm.tsx";
import FooteredPage from "../../../ui/footer/FooteredPage.tsx";
import {Colors} from "../../../../common/Colors.ts";

const RegisterPage = () => {
    return (
        <div style={{background: Colors.Primary}}>
            <FooteredPage>
                <RegisterForm/>
            </FooteredPage>
        </div>
    );
};

export default RegisterPage;