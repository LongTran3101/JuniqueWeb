// PrivateRoute.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import SessionExpiredDialog from "../../layout/SessionExpiredDialog"; 

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, logout, tryRefreshToken } = useAuth();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setCheckingAuth(true);
      const isStillValid = await tryRefreshToken();

      if (isStillValid && isAuthenticated) {
        setAllowed(true);
      } else {
        setShowSessionExpired(true); // show popup thay vì logout ngay
        setAllowed(false);
      }

      setCheckingAuth(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleDialogClose = () => {
    setShowSessionExpired(false);
    logout();
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {allowed ? children : null}
      <SessionExpiredDialog open={showSessionExpired} onClose={handleDialogClose} />
    </>
  );
};

export default PrivateRoute;
