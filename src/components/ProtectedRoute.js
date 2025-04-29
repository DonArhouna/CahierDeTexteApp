import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  // Rediriger vers /login si l'utilisateur n'est pas connecté
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Afficher le composant enfant si l'utilisateur est connecté
  return children;
};

export default ProtectedRoute;