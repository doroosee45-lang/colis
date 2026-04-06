import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * ProtectedRoute — Protège une route selon authentification et rôles.
 *
 * Usage :
 *   <ProtectedRoute>                          → juste authentifié
 *   <ProtectedRoute roles={['admin','superadmin']}> → rôles spécifiques
 */
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Attendre la vérification du token avant de décider
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // Non authentifié → login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rôle insuffisant → accueil dashboard
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default ProtectedRoute;