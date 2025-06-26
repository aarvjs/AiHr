// src/Layouts/PrivateLayout.js
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PrivateLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // 👇 Not logged in, redirect to home
        navigate('/');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Checking login...</div>;

  return <Outlet />;
};

export default PrivateLayout;
