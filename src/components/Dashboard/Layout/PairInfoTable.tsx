import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Create styles using makeStyles
const useStyles = makeStyles({
  tableContainer: {
    maxWidth: "600px", // Set max width for the table container
    margin: "0 auto", // Center the table
  },
  tableCell: {
    maxWidth: "200px", // Set max width for individual table cells
    wordWrap: "break-word", // Wrap text if it exceeds max width
    overflow: "hidden",
    textOverflow: "ellipsis", // Add ellipsis for truncated content
  },
});

interface PairData {
  pair: string;
  data: {
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
  };
}

interface DynamicTableProps {
  pairData: PairData;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ pairData }) => {
  const classes = useStyles();
  const { pair, data } = pairData;

  // Calculate the changes and trend
  const priceChange = (
    ((parseFloat(data[0].price) - parseFloat(data[0].open_24h)) /
      parseFloat(data[0].open_24h)) *
    100
  ).toFixed(2);

  const volumeChange = (
    ((parseFloat(data[0].volume_24h) - parseFloat(data[0].volume_30d)) /
      parseFloat(data[0].volume_30d)) *
    100
  ).toFixed(2);

  const trend = parseFloat(priceChange) > 0 ? "Bullish" : "Bearish";

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        {pair}
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>Label</TableCell>
            <TableCell className={classes.tableCell}>
              {data[0].product_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>
              Change in Price (24h)
            </TableCell>
            <TableCell className={classes.tableCell}>
              {priceChange}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>
              Change in Volume (24h vs 30d)
            </TableCell>
            <TableCell className={classes.tableCell}>
              {volumeChange}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell}>Trend</TableCell>
            <TableCell className={classes.tableCell}>{trend}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
