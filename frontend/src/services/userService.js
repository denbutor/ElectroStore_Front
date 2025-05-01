import api from "./api";

const userService = {
    updateProfile: (data) => api.put("/users/me", data),
    deleteAccount: () => api.delete("/users/me"),
    // getAllUsers: () => api.get("/users/admin"),
};

export default userService;
