import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useAppSelector } from "../../../store";
import DynamicTable from "../DynamicTable";

interface Props {
  selectedPair: string | null;
}

const MainContent: React.FC<Props> = ({ selectedPair }) => {
  const { pairs } = useAppSelector((state) => state.websocket);
    const [price,setPrice] = useState(0);
    const [pair,setPair] = useState([])
  const priceviewcols: any[] = [
    { col: "best_bid", alia: "Bid" },
    { col: "best_ask", alia: "Ask" },
  ];

  const matchview: any[] = [
    { col: "time", alia: "Time" },
    { col: "price", alia: "Price" },
    { col: "last_size", alia: "Trade Size" },
    { col: "side", alia: "Side" },
  ];
  useEffect(()=>{
    
    if(pairs && selectedPair && pairs[selectedPair].length > 0){
        setPair(pairs[selectedPair])
    }
  },[pairs,selectedPair])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {selectedPair && pair.length > 0 
          ? (
            <span>
              {`${selectedPair} = ${pair[0].price} `}
              {pair[0].price > pair[0].open_24h ? (
                <span style={{ color: 'green', fontSize: '1.2rem' }}>▲</span>
              ) : (
                <span style={{ color: 'red', fontSize: '1.2rem' }}>▼</span>
              )}
            </span>
          )
          : "Select a pair from the sidebar"}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        {selectedPair ? (
          <>
            {/* Left Table */}
            <Grid item xs={3}>
              <Box
                sx={{
                //   border: "1px solid #ccc",
                  padding: 2,
                  display: "flex", // Use flexbox for centering
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically (if needed)
                }}
              >
                <Box>
                  <Typography variant="h6" align="center">
                    Price View
                  </Typography>
                  <DynamicTable
                    pair={{ alias: priceviewcols, data: pairs[selectedPair] }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Right Table */}
            <Grid item xs={9}>
              <Box
                sx={{
                //   border: "1px solid #ccc",
                  padding: 2,
                  display: "flex", // Use flexbox for centering
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically (if needed)
                }}
              >
                <Box>
                  <Typography variant="h6" align="center">
                    Match View
                  </Typography>
                  <DynamicTable
                    pair={{ alias: matchview, data: pairs[selectedPair] }}
                  />
                </Box>
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
