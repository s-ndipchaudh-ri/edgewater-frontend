import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface MatchData {
    type: string;
    sequence: number;
    product_id: string;
    price: string;
    open_24h: string;
    volume_24h: string;
    low_24h: string;
    high_24h: string;
    volume_30d: string;
    best_bid: string;
    best_bid_size: string;
    best_ask: string;
    best_ask_size: string;
    side: string;
    time: string;
    trade_id: number;
    last_size: string;
}

interface MatchViewProps {
  pair: string; // Name of the pair (e.g., "BTC-USD")
  data: MatchData[]; // Data for the single pair
}

const MatchViewTable: React.FC<MatchViewProps> = ({ pair, data }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "16px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Match View - {pair}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Trade Size</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Side</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((match, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(match.time).toLocaleString()}</TableCell>
              <TableCell>{match.product_id}</TableCell>
              <TableCell>{match.last_size}</TableCell>
              <TableCell>{match.price}</TableCell>
              <TableCell style={{ color: match.side === "buy" ? "green" : "red" }}>
                {match.side}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchViewTable;
