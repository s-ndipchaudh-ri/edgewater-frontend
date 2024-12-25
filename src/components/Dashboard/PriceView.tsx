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

interface TickerData {
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

const PriceView: React.FC<{ pair: string; data: TickerData[] }> = ({
  pair,
  data,
}) => {
  return (
    <TableContainer component={Paper} style={{ marginBottom: "16px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        {pair} Price Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Best Bid</TableCell>
            <TableCell>Best Bid Size</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Best Ask</TableCell>
            <TableCell>Best Ask Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={`${pair}-${index}`}>
              <TableCell>{item.best_bid}</TableCell>
              <TableCell>{item.best_bid_size}</TableCell>
              <TableCell>
                {new Date(item.time).toLocaleTimeString("en-IN", {
                  hour12: false,
                })}
              </TableCell>
              <TableCell>{item.best_ask}</TableCell>
              <TableCell>{item.best_ask_size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PriceView;
