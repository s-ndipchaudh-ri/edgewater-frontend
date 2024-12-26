import React from 'react';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector } from '../../../store';

interface Props {
  isOpen: boolean;
}

const LeftSidebar: React.FC<Props> = ({ isOpen }) => {
    const {user} = useAppSelector((state) => state.user)
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
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
            <ListItemText primary="Name" secondary={`${user?.username}`} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;
