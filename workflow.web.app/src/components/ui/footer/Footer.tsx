import './style.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer-text">Workflow © {new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;