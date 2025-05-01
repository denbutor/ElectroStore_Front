import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
    const { setToken, setUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.login({
                username: email,
                password,
            });

            const { access_token, user } = response.data;

            if (!access_token || !user) {
                showToast("Invalid credentials.", "error");
                return;
            }

            localStorage.setItem("access_token", access_token);
            setToken(access_token);
            setUser({
                id: user.id,
                email: user.email,
                role: user.role
            });

            showToast("Login successful!", "success");
            navigate("/");
        } catch (err) {
            console.error("LOGIN ERROR:", err.response?.data || err.message);
            showToast(
                err.response?.data?.detail || "Login failed. Please try again.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="input"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input"
                    required
                    minLength={8}
                />
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;