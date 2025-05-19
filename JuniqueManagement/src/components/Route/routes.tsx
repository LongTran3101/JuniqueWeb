import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../page/login';
import Dashboard from '../../page/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Design from '../../page/design/design';
import UploadDesign from '../../page/uploadDesign/UploadDesign';

const ErrorPage: React.FC = () => {
  return <div>Page not found. Please check the URL.</div>;
};
console.log("da vao day")
const AppRoutes: React.FC = () => {
  return (
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
      {/* <Route path="*" element={<Login />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
