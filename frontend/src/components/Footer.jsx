import "./Footer.css"; // окремий файл стилів для футера

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <p>© {new Date().getFullYear()} ElectroStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
