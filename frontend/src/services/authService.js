import api from "./api";

const authService = {
    login: async ({ username, password }) => {
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("grant_type", "password");

        return api.post("/auth/login", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    },

    register: async (data) => {
        return api.post("/auth/register", data);
    },

    getCurrentUser: () => api.get("/users/me"),
};

export default authService;




// import api from "./api";
//
// const authService = {
//     register: (data) => api.post("/auth/register", data),
//     login: (credentials) => api.post("/auth/login", credentials),
//     getCurrentUser: () => api.get("/users/me"),
// };
//
// export default authService;
