// client/src/components/ProtectedRoute/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // ✅ FIX: Destructure isLoading from the useAuth hook
  const { userInfo, isLoading } = useAuth();

  // ✅ FIX: While the context is checking for a user, show a loading state
  if (isLoading) {
    return <div className="status-message">Loading...</div>;
  }

  // If loading is finished and there's no user, redirect to login
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, show the requested page
  return <>{children}</>;
};

export default ProtectedRoute;