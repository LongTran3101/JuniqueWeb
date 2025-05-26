import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './components/Route/routes';
import Layout from './layout/Layout';
import { LoadingProvider } from './context/LoadingContext';
import LoadingOverlay from './context/ComponentsUntil/LoadingOverlay';
import { NotificationProvider } from './context/NotificationProvider';

const App: React.FC = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <LoadingProvider>
              <LoadingOverlay />
              <AppRoutes />
            </LoadingProvider>
          </Layout>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>

  );
};

export default App;