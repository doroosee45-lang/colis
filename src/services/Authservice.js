import api from "./axios";

const authService = {

  // POST /api/auth/register
  register: (data) =>
    api.post("/auth/register", data),

  // POST /api/auth/login
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
    }
    return res;
  },

  // GET /api/auth/me
  getMe: () =>
    api.get("/auth/me"),

  // PUT /api/auth/update-profile
  updateProfile: (data) => {
    const isFormData = data instanceof FormData;
    return api.put("/auth/update-profile", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  // PUT /api/auth/change-password
  changePassword: (currentPassword, newPassword) =>
    api.put("/auth/change-password", { currentPassword, newPassword }),

  // POST /api/auth/forgot-password
  forgotPassword: (email) =>
    api.post("/auth/forgot-password", { email }),

  // PUT /api/auth/reset-password/:token
  resetPassword: (token, password) =>
    api.put(`/auth/reset-password/${token}`, { password }),

  // Déconnexion locale
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  // Récupérer l'user depuis localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si connecté
  isAuthenticated: () => !!localStorage.getItem("token"),
};

export default authService;