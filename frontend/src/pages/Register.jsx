import { useState, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
    const { showToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", surname: "", email: "", password: "",
        phone_number: "", city: "", nova_poshta_department: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.register(formData);
            showToast("Registration successful!", "success");
            navigate("/login");
        } catch {
            showToast("Registration failed. Email/phone may already exist.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Register</h1>
            <form className="form" onSubmit={handleSubmit}>
                {["name", "surname", "email", "password", "phone_number", "city", "nova_poshta_department"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        type={field === "password" ? "password" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                ))}
                <button className="button" type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;


// import { useState, useContext } from "react";
// import { ToastContext } from "../context/ToastContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
//
// const Register = () => {
//     const { showToast } = useContext(ToastContext);
//     const [formData, setFormData] = useState({
//         name: "",
//         surname: "",
//         email: "",
//         password: "",
//         phone_number: "",
//         city: "",
//         nova_poshta_department: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//
//     const API_URL = import.meta.env.VITE_API_URL;
//
//     const handleChange = (e) => {
//         setFormData({...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//
//         try {
//             await axios.post(`${API_URL}/auth/register`, formData);
//             showToast("Registration successful!", "success");
//             setFormData({
//                 name: "",
//                 surname: "",
//                 email: "",
//                 password: "",
//                 phone_number: "",
//                 city: "",
//                 nova_poshta_department: "",
//             });
//             navigate("/login");
//         } catch (error) {
//             showToast("Registration failed. Email or phone number already exists.", "error");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="page">
//             <h1>Register</h1>
//             <form className="form" onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="input" />
//                 <input type="text" name="surname" placeholder="Surname" required value={formData.surname} onChange={handleChange} className="input" />
//                 <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="input" />
//                 <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="input" />
//                 <input type="text" name="phone_number" placeholder="Phone Number" required value={formData.phone_number} onChange={handleChange} className="input" />
//                 <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="input" />
//                 <input type="text" name="nova_poshta_department" placeholder="Nova Poshta Department" required value={formData.nova_poshta_department} onChange={handleChange} className="input" />
//
//                 <button type="submit" className="button" disabled={loading}>
//                     {loading ? "Registering..." : "Register"}
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Register;
