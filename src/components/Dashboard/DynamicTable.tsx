import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Date formatting utility function
const formatTime = (timeValue: string): string => {
  const date = new Date(timeValue);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const yy = String(date.getFullYear()).slice(-2);
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${dd}/${mm}/${yy} ${hh}:${min}:${ss}`;
};

interface Pair {
  alias: Array<{ col: string; alia: string }>;
  data: Array<{ [key: string]: any }>;
}

interface TableDataProps {
  pair: Pair;
}

const DynamicTable: React.FC<TableDataProps> = ({ pair }) => {
  const { alias, data } = pair;

  // Map aliases to a dictionary for easy access
  const aliasMap = alias.reduce((acc, { col, alia }) => {
    acc[col] = alia;
    return acc;
  }, {} as { [key: string]: string });

  // Get all column keys mentioned in alias
  const aliasColumns = Object.keys(aliasMap);

  // Process data to format the time column if present
  const processedData = data.map((row) => {
    const newRow = { ...row };
    alias.forEach(({ col }) => {
      if (col.toLowerCase().includes('time') && row[col]) {
        newRow[col] = formatTime(row[col]);
      }
    });
    return newRow;
  });

  // Determine row color based on the 'side' column
  const getRowColor = (row: { [key: string]: any }): string | undefined => {
    const sideCol = alias.find(({ col }) => col.toLowerCase().includes('side'));
    if (sideCol && row[sideCol.col]) {
      return row[sideCol.col].toLowerCase() === 'sell' ? '#ffcccc' : '#ccffcc'; // Red for "sell", green otherwise
    }
    return undefined; // Default row color
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
      <Table
        size="small"
        aria-label="dynamic table"
        sx={{
          tableLayout: 'auto',
          '& .MuiTableHead-root': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <TableHead>
          <TableRow>
            {aliasColumns.map((col) => (
              <TableCell
                key={col}
                align="center"
                sx={{
                  whiteSpace: 'nowrap',
                  minWidth: `${aliasMap[col].length + 4}ch`,
                  padding: '8px 12px', // Add padding
                  fontWeight: 'bold',
                  border: '1px solid #e0e0e0', // Border for better separation
                }}
              >
                {aliasMap[col]} {/* Use alias for column headers */}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {processedData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: '#f9f9f9' }, // Hover effect for rows
                backgroundColor: getRowColor(row), // Set row color
              }}
            >
              {aliasColumns.map((col) => (
                <TableCell
                  key={col}
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: `${aliasMap[col].length + 4}ch`,
                    padding: '8px 12px', // Add padding
                    border: '1px solid #e0e0e0', // Border for better separation
                  }}
                >
                  {row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
