import React from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  fxPairs: string[];
  toggleDialog: () => void;
  handlePairSelect: (pair: string) => void;
}

const RightSidebar: React.FC<Props> = ({ fxPairs, toggleDialog, handlePairSelect }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          top: (theme) => theme.mixins.toolbar.minHeight, // Start below AppBar
          height: `calc(100% - ${(theme) => theme.mixins.toolbar.minHeight}px)`, // Adjust height
        },
      }}
    >
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
  );
};

export default RightSidebar;
