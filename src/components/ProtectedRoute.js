// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // true if session exists, false if not
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Checking auth...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // 🔐 Redirect if not logged in
  }

  return children; // ✅ Allow route access
};

export default ProtectedRoute;
