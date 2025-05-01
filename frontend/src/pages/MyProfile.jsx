import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/userService";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const { user, logout, setUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone_number: "",
        city: "",
        nova_post_department: "",

    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                surname: user.surname || "",
                email: user.email,
                password: "", // leave empty for security reasons
                phone_number: user.phone_number || "",
                city: user.city || "",
                nova_post_department: user.nova_post_department || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await userService.updateUser(formData);
            setUser(res.data);
            showToast("Profile update successfully", "success");
        } catch (err) {
            showToast("Profile not updated", "error");
        }
    };

    const handleDelete = async () => {
        if (confirm("Do you really want to delete your profile?")) {
            try {
                await userService.deleteUser();
                logout();
                showToast("Profile deleted", "success");
            } catch {
                showToast("Profile not deleted", "error");
            }
        }
    };

    return (
        <div className="page">
            <h1>My profile</h1>
            <form className="form" onSubmit={handleUpdate}>
                {Object.entries(formData).map(([key, value]) => (
                    <input
                        key={key}
                        type={key === "password" ? "password" : "text"}
                        name={key}
                        value={value}
                        placeholder={key.replaceAll("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                ))}
                <button className="button" type="submit">Update profile</button>
                <button className="button" onClick={handleDelete} style={{backgroundColor: "red" }}>
                    Delete profile
                </button>
            </form>

        </div>
    );
};

export default MyProfile;