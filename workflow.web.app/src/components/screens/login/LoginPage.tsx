import Footer from "../../ui/footer/Footer.tsx";
import "./style.scss"
import LoginForm from "./LoginForm.tsx";

const LoginPage = () => {
    return (
        <div className="login-page">
            <LoginForm/>
            <Footer/>
        </div>
    );
};

export default LoginPage;