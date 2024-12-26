import React, { useState } from 'react';
import { Box, Typography, Collapse, useMediaQuery, useTheme } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PairInfoTable from './PairInfoTable';
import { useAppSelector } from '../../../store';

const BottomDrawer: React.FC = () => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  const { pairs } = useAppSelector((state) => state.websocket);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screen

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 3 }}>
      {/* Drawer toggle bar */}
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

      {/* Drawer content */}
      <Collapse in={isBottomDrawerOpen}>
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #ccc',
            padding: 2,
            height: isBottomDrawerOpen ? '50vh' : '100px', // Adjust height based on state
            overflow: 'auto',
            transition: 'height 0.3s ease',
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row', // Responsive layout
            gap: 2, // Space between tables
            flexWrap: 'wrap', // Ensure tables wrap when screen size decreases
          }}
        >
          {pairs &&
            Object.keys(pairs).map((pair) => (
              <Box key={pair} sx={{ flex: '1 1 auto', minWidth: '300px' }}>
                <PairInfoTable pairData={{ pair: pair, data: pairs[pair] }} />
              </Box>
            ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default BottomDrawer;
