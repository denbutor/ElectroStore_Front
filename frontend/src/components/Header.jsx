import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/">ElectroStore</Link>
                </div>

                <nav className="nav">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/products" className="nav-link">
                        Products
                    </NavLink>
                    <NavLink to="/cart" className="nav-link">
                        Cart
                    </NavLink>
                    <NavLink to="/orders" className="nav-link">
                        My orders
                    </NavLink>
                    <NavLink to="/login" className="nav-link">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="nav-link">
                        Register
                    </NavLink>
                    <NavLink to="/profile" className="nav-link">
                        My profile
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
