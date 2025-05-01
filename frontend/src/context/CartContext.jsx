import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import api from "../services/api.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API_URL}/cart/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem("access_token");
        return api.post("/add_to_cart", { product_id: productId, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };


    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`${API_URL}/cart/remove_item/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            fetchCart();
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${API_URL}/cart/clear_cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            fetchCart();
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };
