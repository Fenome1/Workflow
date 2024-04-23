import './style.scss'
import {AppColors} from "../../../common/AppColors.ts";

const Footer = () => {
    return (
        <footer className="footer" style={{background: AppColors.Primary}}>
            <span className="footer-text">Workflow © {new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;