import api from "./api";

const reviewService = {
    getAllReviews: () => api.get("/reviews/"),
    getReviewsByProduct: (productId) => api.get(`/reviews/product/${productId}`),
    createReview: (data) => api.post("/reviews/", data),
    updateReview: (id, data) => api.patch(`/reviews/${id}`, data),
    deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default reviewService;
