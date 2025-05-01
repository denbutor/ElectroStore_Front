import api from "./api";

const categoryService = {
    getAll: () => api.get("/categories/"),
    getProductsByCategoryName: (categoryName) => api.get(`/categories/name/${categoryName}/products`),
};

export default categoryService;