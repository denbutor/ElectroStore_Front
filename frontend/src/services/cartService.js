import api from "./api";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

const cartService = {
    getCart: () => api.get("/cart", getAuthHeaders()),
    createCart: () => api.post("/cart/create", {}, getAuthHeaders()),
    addToCart: (product_id, quantity = 1) =>
        api.post("/cart/add_to_cart", { product_id, quantity }, getAuthHeaders()),
    removeFromCart: (product_id) =>
        api.delete(`/cart/remove/${product_id}`, getAuthHeaders()),
    clearCart: () => api.delete("/cart/clear", getAuthHeaders()),
};

export default cartService;
