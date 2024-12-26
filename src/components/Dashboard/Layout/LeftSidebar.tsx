import React from 'react';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

interface Props {
  isOpen: boolean;
}

const LeftSidebar: React.FC<Props> = ({ isOpen }) => {
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
            <ListItemText primary="Name" secondary="John Doe" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary="johndoe@example.com" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;
