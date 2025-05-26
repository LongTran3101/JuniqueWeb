import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isTopbarVisible] = useState(true); // Or however you determine Topbar visibility



  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        {isTopbarVisible && <Topbar />}
        {isTopbarVisible && <Toolbar />} {/* Only render Toolbar if Topbar is visible */}
        <Box
          sx={{
            padding: 0, // Remove padding
            width: '100%', // Ensure full width
            minHeight: '100vh', // Ensure full viewport height,
            boxSizing: 'border-box' // Include padding and border in element's total width and height
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
