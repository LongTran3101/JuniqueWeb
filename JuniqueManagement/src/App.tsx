import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './components/Route/routes';
import Layout from './layout/Layout';
import { LoadingProvider } from './context/LoadingContext';
import LoadingOverlay from './context/ComponentsUntil/LoadingOverlay';

const App: React.FC = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <LoadingProvider>
            <LoadingOverlay />
            <AppRoutes />
          </LoadingProvider>
        </Layout>
      </AuthProvider>
    </BrowserRouter>

  );
};

export default App;