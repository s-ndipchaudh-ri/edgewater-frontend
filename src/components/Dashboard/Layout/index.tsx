import React, { useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import AppBarComponent from './AppBarComponent';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import BottomDrawer from './BottomDrawer';
import PairSelectionDialog from './PairSelectionDialog';

const allFxPairs = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CHF'];

const App: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [fxPairs, setFxPairs] = useState<string[]>(allFxPairs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen((prev) => !prev);
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };

  const applyPairSelection = (selectedPairs: string[]) => {
    setFxPairs(selectedPairs);
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarComponent toggleLeftSidebar={toggleLeftSidebar} />
      <LeftSidebar isOpen={isLeftSidebarOpen} />
      <RightSidebar fxPairs={fxPairs} toggleDialog={toggleDialog} handlePairSelect={handlePairSelect} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <MainContent selectedPair={selectedPair} />
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
