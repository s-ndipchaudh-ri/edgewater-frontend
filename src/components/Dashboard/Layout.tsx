import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Fab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../store';
import websocketManager from '../../websocketManager';
import { logout } from '../../store/userSlice';
import { removePairs } from '../../store/websocketSlice';

const allFxPairs = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CHF'];

const App: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  const [fxPairs, setFxPairs] = useState<string[]>(allFxPairs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPairsInDialog, setSelectedPairsInDialog] = useState<string[]>(fxPairs);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const { isLoggedIn, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isSocketEnable, setIsSocketEnable] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removePairs());
    websocketManager.disconnect();
  };


  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleCheckboxChange = (pair: string) => {
    setSelectedPairsInDialog((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair]
    );
  };

  const applyPairSelection = () => {
    setFxPairs(selectedPairsInDialog);
    setIsDialogOpen(false);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleLeftSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Coinbase
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isLeftSidebarOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            User Details
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="Name" secondary="John Doe" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary="johndoe@example.com" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', position: 'relative' }}>
          <Fab
            color="primary"
            size="small"
            sx={{ position: 'absolute', top: 10, right: 10 }}
            onClick={toggleDialog}
          >
            <AddIcon />
          </Fab>
          <List>
            {fxPairs.map((pair) => (
              <ListItem button key={pair} onClick={() => handlePairSelect(pair)}>
                <ListItemText primary={pair} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5">
          {selectedPair ? `Data for: ${selectedPair}` : 'Select a pair from the sidebar'}
        </Typography>
        {/* Display data for the selected pair */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
              {selectedPair ? (
                <Typography>Displaying data for {selectedPair}</Typography>
              ) : (
                <Typography>No pair selected</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Drawer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
      >
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
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #ccc',
              padding: 2,
              height: 100,
              overflow: 'auto',
            }}
          >
            <Typography>System is operational</Typography>
          </Box>
        </Collapse>
      </Box>

      {/* Pop-up Dialog */}
      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>Select FX Pairs</DialogTitle>
        <DialogContent>
          {allFxPairs.map((pair) => (
            <FormControlLabel
              key={pair}
              control={
                <Checkbox
                  checked={selectedPairsInDialog.includes(pair)}
                  onChange={() => handleCheckboxChange(pair)}
                />
              }
              label={pair}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button onClick={applyPairSelection} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
// v1
