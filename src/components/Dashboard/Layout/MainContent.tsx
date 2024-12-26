import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PriceView1 from '../PriceView1';

interface Props {
  selectedPair: string | null;
}

const MainContent: React.FC<Props> = ({ selectedPair }) => {
  return (
    <Box>
      <Typography variant="h5">
        {selectedPair ? `Data for: ${selectedPair}` : 'Select a pair from the sidebar'}
      </Typography>
      <Grid container spacing={0} sx={{ mt: 3 }}>
        {selectedPair ? (
          <>
            {/* Left Table - 20% */}
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid #ccc', }}>
                <Typography variant="h6">Left Table</Typography>
                {/* Table content goes here */}
                <PriceView1 />
              </Box>
            </Grid>
            
      
          </>
        ) : (
          <Grid item xs={12}>
            <Typography>No pair selected</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MainContent;
