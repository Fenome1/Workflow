import LoginForm from "./LoginForm.tsx";
import FooteredPage from "../../../ui/footer/FooteredPage.tsx";
import {Colors} from "../../../../common/Colors.ts";

const LoginPage = () => {
    return (
        <div style={{background: Colors.Primary}}>
            <FooteredPage>
                <LoginForm/>
            </FooteredPage>
        </div>
    );
};

export default LoginPage;