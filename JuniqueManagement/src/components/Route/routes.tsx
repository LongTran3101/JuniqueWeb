import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../page/login';

const Dashboard = lazy(() => import('../../page/dashboard/Dashboard'));
const Design = lazy(() => import('../../page/design/design'));
const UploadDesign = lazy(() => import('../../page/uploadDesign/UploadDesign'));

const ErrorPage: React.FC = () => {
  return <div>Page not found. Please check the URL.</div>;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/design"
          element={
            <PrivateRoute>
              <Design />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadDesign />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
