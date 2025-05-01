import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import userService from "../services/userService";
import orderService from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", surname: "", email: "", phone_number: "", city: "", nova_poshta_department: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({ ...formData, ...user });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return showToast("Your cart is empty!", "error");
        setLoading(true);
        try {
            await userService.updateProfile(formData);
            await orderService.createOrderFromCart();
            clearCart();
            showToast("Order created successfully!", "success");
            navigate("/");
        } catch {
            showToast("Failed order creating.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Checkout</h1>
            <form className="form" onSubmit={handleSubmit}>
                {["name", "surname", "email", "phone_number", "city", "nova_poshta_department"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                ))}
                <button className="button" type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Buy"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;


// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";
// import { ToastContext } from "../context/ToastContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
//
// const Checkout = () => {
//     const { cartItems, clearCart } = useContext(CartContext);
//     const { user } = useContext(AuthContext);
//     const { showToast } = useContext(ToastContext);
//     const navigate = useNavigate();
//
//     const [formData, setFormData] = useState({
//         name: "",
//         surname: "",
//         email: "",
//         phone_number: "",
//         city: "",
//         nova_poshta_department: "",
//     });
//
//     const [loading, setLoading] = useState(false);
//
//     const API_URL = import.meta.env.VITE_API_URL;
//
//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || "",
//                 surname: user.surname || "",
//                 email: user.email || "",
//                 phone_number: user.phone_number || "",
//                 city: user.city || "",
//                 nova_poshta_department: user.nova_poshta_department || "",
//             });
//         }
//     }, [user]);
//
//     const handleChange = (e) => {
//         setFormData({...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleCheckout = async (e) => {
//         e.preventDefault();
//
//         if (cartItems.length === 0) {
//             showToast("Your cart is empty!", "error");
//             return;
//         }
//
//         setLoading(true);
//
//         try {
//             await axios.patch(`${API_URL}/users/me`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             });
//
//             await axios.post(`${API_URL}/orders/from-cart`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             });
//
//             clearCart();
//             showToast("Order placed successfully!", "success");
//             navigate("/");
//         } catch (error) {
//             showToast("Failed to process your order.", "error");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="page">
//             <h1>Checkout</h1>
//             <form className="form" onSubmit={handleCheckout}>
//                 <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="input" />
//                 <input type="text" name="surname" placeholder="Surname" required value={formData.surname} onChange={handleChange} className="input" />
//                 <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="input" />
//                 <input type="text" name="phone_number" placeholder="Phone Number" required value={formData.phone_number} onChange={handleChange} className="input" />
//                 <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="input" />
//                 <input type="text" name="nova_poshta_department" placeholder="Nova Poshta Department" required value={formData.nova_poshta_department} onChange={handleChange} className="input" />
//
//                 <h2>Products:</h2>
//                 <ul className="cart-list">
//                     {cartItems.map((item) => (
//                         <li key={item.id} className="cart-item">
//                             {item.product.name} — {item.quantity} pcs
//                         </li>
//                     ))}
//                 </ul>
//
//                 <button type="submit" className="button" disabled={loading}>
//                     {loading ? "Processing..." : "Buy"}
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Checkout;
