import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../../../store';
import { logout } from '../../../store/userSlice';

interface Props {
  toggleLeftSidebar: () => void;
}

const AppBarComponent: React.FC<Props> = ({ toggleLeftSidebar }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleLeftSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          TradeNow
        </Typography>
        {/* <Button color="inherit" onClick={() => {websocketManager.connect(); setIsSocketEnable(true)}}>
          {
            isSocketEnable ? <>Disconnect</> : <>Connect</>
          }
        </Button> */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
