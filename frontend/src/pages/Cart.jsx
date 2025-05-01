import { useEffect, useState, useContext } from "react";
import cartService from "../services/cartService";
import { ToastContext } from "../context/ToastContext";

const Cart = () => {
    const { showToast } = useContext(ToastContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await cartService.getCart();
            setCartItems(res.data.items);
        } catch (err) {
            showToast("Could not load cart", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleIncrement = async (productId) => {
        try {
            await cartService.addToCart(productId, 1);
            fetchCart();
        } catch {
            showToast("Error when increasing quantity", "error");
        }
    };

    const handleDecrement = async (productId, currentQty) => {
        if (currentQty <= 1) {
            await handleRemove(productId);
            return;
        }

        try {
            await cartService.addToCart(productId, -1);
            fetchCart();
        } catch {
            showToast("Error when decreasing quantity", "error");
        }
    };

    const handleRemove = async (productId) => {
        try {
            await cartService.removeFromCart(productId);
            fetchCart();
        } catch {
            showToast("Error deleting product", "error");
        }
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
    );

    if (loading) return <div className="page"><p>Loading...</p></div>;

    return (
        <div className="page">
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-info">
                                <h3>{item.product.name}</h3>
                                <p>{item.product.price} $ / pcs</p>
                                <div>
                                    <button className="button" onClick={() => handleDecrement(item.product.id, item.quantity)}>-</button>
                                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                                    <button className="button" onClick={() => handleIncrement(item.product.id)}>+</button>
                                    <button className="button" onClick={() => handleRemove(item.product.id)} style={{ marginLeft: "10px", backgroundColor: "red" }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="cart-actions">
                <h2>Total cost: {total} $</h2>
                <button className="button" onClick={async () => {
                    try {
                        await cartService.clearCart();
                        fetchCart();
                        showToast("Cart cleared", "success");
                    } catch {
                        showToast("Error clearing the trash", "error");
                    }
                }}>Clear cart</button>

                <button className="button" style={{ marginLeft: "10px" }} onClick={async () => {
                    try {
                        await api.post("/orders/from-cart", {}, getAuthHeaders());
                        await cartService.clearCart();
                        fetchCart();
                        showToast("Order created! Awaiting confirmation", "success");
                    } catch {
                        showToast("Unable create order", "error");
                    }
                }}>Create order</button>
            </div>

        </div>
    );
};

export default Cart;
