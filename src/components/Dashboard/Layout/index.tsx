import React, { useEffect, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AppBarComponent from './AppBarComponent';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import BottomDrawer from './BottomDrawer';
import PairSelectionDialog from './PairSelectionDialog';
import websocketManager from '../../../websocketManager';
import { useAppSelector } from '../../../store';
import { updateUserPairs } from "../../../store/userSlice";
import { useDispatch } from 'react-redux';



const allFxPairs = ['BTC-USD', 'ETH-USD', 'XRP-USD', 'LTC-USD'];

const App: React.FC = () => {
  
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [fxPairs, setFxPairs] = useState<string[]>(allFxPairs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false); // Sidebar state
  const {user} = useAppSelector((state) => state.user)
  const dispatch = useDispatch();
  useEffect(()=> {
    websocketManager.connect()
  },[])
  useEffect(()=>{
    if(user){
        
        setFxPairs(user.pairs)
    }
  },[user])
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);
  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };
  const applyPairSelection = (selectedPairs: string[]) => {
    console.log(selectedPairs);
    dispatch(updateUserPairs(selectedPairs))
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
          zIndex: 1, // Keep it below the sidebar,
          width:"80vw"
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
