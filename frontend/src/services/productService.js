import api from "./api";

const productService = {
    getAll: () => api.get("/products/"),
    searchByName: (name) => api.get(`/products/search/${name}`),
    getById: (id) => api.get(`/products/${id}`),
    update: (id, data) => api.patch(`/products/${id}`, data),
    create: (data) => api.post("/products/", data),
    delete: (id) => api.delete(`/products/${id}`),
};

export default productService;
