import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

// ─── Redirection par rôle ───────────────────────────────────────────────────
const ROLE_REDIRECTS = {
  superadmin: '/app',
  admin:      '/app',
  manager:    '/app',
  agent:      '/app/packages',
  client:     '/app/packages',
};

const getRedirectPath = (role) => ROLE_REDIRECTS[role] || '/app';

// ─── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true); // true au démarrage pour vérifier le token

  // ── Initialisation : charger depuis localStorage ──
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser  = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // ── Login ──
  const login = useCallback(async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });

    const { token: newToken, user: newUser } = response.data.data ?? response.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);

    // Redirection selon le rôle
    navigate(getRedirectPath(newUser.role), { replace: true });

    return newUser;
  }, [navigate]);

  // ── Register ──
  const register = useCallback(async (formData) => {
    const response = await axios.post(API_ENDPOINTS.REGISTER, formData);

    const { token: newToken, user: newUser } = response.data.data ?? response.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);

    // Redirection selon le rôle après inscription
    navigate(getRedirectPath(newUser.role), { replace: true });

    return newUser;
  }, [navigate]);

  // ── Logout ──
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  // ── Refresh profil ──
  const refreshUser = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ME);
      const updatedUser = response.data.data?.user ?? response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch {
      logout();
    }
  }, [logout]);

  // ── Helpers ──
  const isAuthenticated = !!token && !!user;

  const hasRole = useCallback((...roles) => {
    return roles.includes(user?.role);
  }, [user]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    hasRole,
    getRedirectPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;



// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../services/axios';
// import { API_ENDPOINTS } from '../../api/endpoints';

// // ─── Redirection par rôle (désactivée car toutes les routes sont publiques) ──
// // const ROLE_REDIRECTS = {
// //   superadmin: '/app',
// //   admin:      '/app',
// //   manager:    '/app',
// //   agent:      '/app/packages',
// //   client:     '/app/packages',
// // };
// //
// // const getRedirectPath = (role) => ROLE_REDIRECTS[role] || '/app';

// // ─── Context ────────────────────────────────────────────────────────────────
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser]       = useState(null);
//   const [token, setToken]     = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ── Initialisation : charger depuis localStorage ──
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser  = localStorage.getItem('user');

//     if (storedToken && storedUser) {
//       try {
//         setToken(storedToken);
//         setUser(JSON.parse(storedUser));
//       } catch {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//     setLoading(false);
//   }, []);

//   // ── Login (sans redirection automatique) ──
//   const login = useCallback(async (email, password) => {
//     const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });

//     const { token: newToken, user: newUser } = response.data.data ?? response.data;

//     localStorage.setItem('token', newToken);
//     localStorage.setItem('user', JSON.stringify(newUser));

//     setToken(newToken);
//     setUser(newUser);

//     // Redirection supprimée : l'utilisateur reste sur la page actuelle
//     // navigate(getRedirectPath(newUser.role), { replace: true });

//     return newUser;
//   }, []); // plus besoin de navigate

//   // ── Register (sans redirection automatique) ──
//   const register = useCallback(async (formData) => {
//     const response = await axios.post(API_ENDPOINTS.REGISTER, formData);

//     const { token: newToken, user: newUser } = response.data.data ?? response.data;

//     localStorage.setItem('token', newToken);
//     localStorage.setItem('user', JSON.stringify(newUser));

//     setToken(newToken);
//     setUser(newUser);

//     // Redirection supprimée
//     // navigate(getRedirectPath(newUser.role), { replace: true });

//     return newUser;
//   }, []);

//   // ── Logout (redirige vers /login – optionnel, peut être conservé) ──
//   const logout = useCallback(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//     navigate('/login', { replace: true });
//   }, [navigate]);

//   // ── Refresh profil ──
//   const refreshUser = useCallback(async () => {
//     try {
//       const response = await axios.get(API_ENDPOINTS.ME);
//       const updatedUser = response.data.data?.user ?? response.data.user;
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     } catch {
//       logout();
//     }
//   }, [logout]);

//   // ── Helpers ──
//   const isAuthenticated = !!token && !!user;

//   const hasRole = useCallback((...roles) => {
//     return roles.includes(user?.role);
//   }, [user]);

//   const value = {
//     user,
//     token,
//     loading,
//     isAuthenticated,
//     login,
//     register,
//     logout,
//     refreshUser,
//     hasRole,
//     // getRedirectPath, // plus nécessaire
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ─── Hook ────────────────────────────────────────────────────────────────────
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth doit être utilisé dans un AuthProvider');
//   }
//   return context;
// };

// export default AuthContext;