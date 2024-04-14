import './style.scss'
import {Colors} from "../../../common/Colors.ts";

const Footer = () => {
    return (
        <footer className="footer" style={{background: Colors.Primary}}>
            <span className="footer-text">Workflow © {new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;