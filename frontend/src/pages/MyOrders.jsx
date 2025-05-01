import { useEffect, useState, useContext } from "react";
import orderService from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) return;

        orderService.getAllOrders().then((res) => {
            const userOrders = res.data.filter(o => o.user?.id === user.id);
            setOrders(userOrders);
        });
    }, [user]);

    return (
        <div className="page">
            <h1>My orders</h1>
            <ul className="admin-list">
                {orders.map((o) => (
                    <li key={o.id} className="admin-item">
                        <p><strong>Status:</strong> {o.status}</p>
                        <p><strong>Product quantity:</strong> {o.items?.length || 0}</p>
                        <p><strong>Date:</strong> {new Date(o.created_at).toLocaleDateString()}</p>
                        {o.items?.map((item) => (
                            <div key={item.id}>
                                <p>- {item.product?.name} × {item.quantity}</p>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyOrders;
