import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useLoading } from "../LoadingContext"; 

const LoadingOverlay: React.FC = () => {
  const { loading } = useLoading();

  return (
    <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
