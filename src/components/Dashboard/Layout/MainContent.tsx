import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface Props {
  selectedPair: string | null;
}

const MainContent: React.FC<Props> = ({ selectedPair }) => {
  return (
    <Box>
      <Typography variant="h5">
        {selectedPair ? `Data for: ${selectedPair}` : 'Select a pair from the sidebar'}
      </Typography>
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
  );
};

export default MainContent;
