import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import axios from "axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { showToast } = useContext(ToastContext);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/orders/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const confirmOrder = async (orderId) => {
        try {
            await axios.patch(
                `${API_URL}/orders/${orderId}`,
                { status: "confirmed" },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            fetchOrders();
            showToast("Order confirmed successfully!", "success");
        } catch (error) {
            showToast("Failed to confirm order.", "error");
        }
    };

    return (
        <div className="page">
            <h1>Admin: Manage Orders</h1>
            <ul className="admin-list">
                {orders.map((order) => (
                    <li key={order.id} className="admin-item">
                        <h3>Order #{order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Customer: {order.user?.name} {order.user?.surname}</p>
                        {order.status !== "confirmed" && (
                            <button className="button" onClick={() => confirmOrder(order.id)}>
                                Confirm
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOrders;
