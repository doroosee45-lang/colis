// src/components/Context/PublicRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // ou un spinner
  }

  // Si l'utilisateur est connecté, on le redirige vers le dashboard
  if (user) {
    return <Navigate to="/app" replace />;
  }

  // Sinon, on affiche la page publique (login, register, etc.)
  return children;
};

export default PublicRoute;