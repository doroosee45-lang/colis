import axios from "axios";

// ─────────────────────────────────────────
//  Instance Axios principale
// ─────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────────
//  Intercepteur REQUEST → ajoute le token JWT
// ─────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────
//  Intercepteur RESPONSE → gestion globale des erreurs
// ─────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || "Erreur serveur.";

    // Token expiré ou invalide → redirection login
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Accès refusé
    if (status === 403) {
      console.warn("⛔ Accès refusé :", message);
    }

    // Erreur serveur
    if (status >= 500) {
      console.error("🔥 Erreur serveur :", message);
    }

    return Promise.reject(error);
  }
);

export default api;