import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated private route " , isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
