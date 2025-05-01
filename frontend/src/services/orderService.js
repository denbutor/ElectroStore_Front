import api from "./api";

const orderService = {
    getAllOrders: () => api.get("/orders/"),
    createOrderFromCart: () => api.post("/orders/from-cart"),
    updateOrderStatus: (orderId, status) => api.patch(`/orders/${orderId}`, { status }),
};

export default orderService;
