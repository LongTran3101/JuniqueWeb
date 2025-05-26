import React from 'react';
import DashboardSummary from './DashboardSummary';
import { Box } from '@mui/material';
import YourDesigns from './YourDesigns';
import LastSales from './LastSales';
const Dashboard: React.FC = () => {
  return (
    <Box >
      <DashboardSummary />
      {/* các phần khác của dashboard */}
      <YourDesigns/>
      <LastSales/>
    </Box>
  );
};

export default Dashboard;
