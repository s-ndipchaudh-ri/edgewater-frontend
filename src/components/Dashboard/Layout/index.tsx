import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AppBarComponent from './AppBarComponent';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import BottomDrawer from './BottomDrawer';
import PairSelectionDialog from './PairSelectionDialog';

const allFxPairs = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CHF'];

const App: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [fxPairs, setFxPairs] = useState<string[]>(allFxPairs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false); // Sidebar state

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };

  const applyPairSelection = (selectedPairs: string[]) => {
    setFxPairs(selectedPairs);
    setIsDialogOpen(false);
  };

  const toggleLeftSidebar = () => setIsLeftSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <AppBarComponent toggleLeftSidebar={toggleLeftSidebar} />

      {/* Left Sidebar */}
      {isLeftSidebarOpen && (
        <Box
          sx={{
            width: 240, // Sidebar width
            position: 'absolute', // Overlay effect
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 1200, // Ensure it appears above MainContent
            backgroundColor: '#fff', // Sidebar background color
            boxShadow: '2px 0px 5px rgba(0,0,0,0.2)', // Optional shadow
          }}
        >
          <LeftSidebar isOpen={isLeftSidebarOpen} />
        </Box>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          position: 'relative', // Maintain its layout
          zIndex: 1, // Keep it below the sidebar
        }}
      >
        <Toolbar />
        <MainContent selectedPair={selectedPair} />
      </Box>

      {/* Right Sidebar */}
      <Box
        sx={{
          width: 240, // Fixed width for the right sidebar
          flexShrink: 0,
        }}
      >
        <RightSidebar fxPairs={fxPairs} toggleDialog={toggleDialog} handlePairSelect={handlePairSelect} />
      </Box>

      <BottomDrawer />
      <PairSelectionDialog
        allFxPairs={allFxPairs}
        selectedPairs={fxPairs}
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        applySelection={applyPairSelection}
      />
    </Box>
  );
};

export default App;
