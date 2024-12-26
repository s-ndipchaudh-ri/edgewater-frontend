import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BottomDrawer: React.FC = () => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 3 }}>
      <Box
        onClick={() => setIsBottomDrawerOpen((prev) => !prev)}
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: 1,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>System Status</Typography>
        {isBottomDrawerOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Collapse in={isBottomDrawerOpen}>
        <Box sx={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #ccc', padding: 2, height: 100, overflow: 'auto' }}>
          <Typography>System is operational</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BottomDrawer;
