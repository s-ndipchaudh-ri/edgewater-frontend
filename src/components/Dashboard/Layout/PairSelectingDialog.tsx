import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface Props {
  allFxPairs: string[];
  selectedPairs: string[];
  isOpen: boolean;
  toggleDialog: () => void;
  applySelection: (selectedPairs: string[]) => void;
}

const PairSelectionDialog: React.FC<Props> = ({
  allFxPairs,
  selectedPairs,
  isOpen,
  toggleDialog,
  applySelection,
}) => {
  const [localSelection, setLocalSelection] = React.useState<string[]>(selectedPairs);

  const handleCheckboxChange = (pair: string) => {
    setLocalSelection((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair]
    );
  };

  const handleApply = () => {
    applySelection(localSelection);
  };

  return (
    <Dialog open={isOpen} onClose={toggleDialog}>
      <DialogTitle>Select FX Pairs</DialogTitle>
      <DialogContent>
        {allFxPairs.map((pair) => (
          <FormControlLabel
            key={pair}
            control={
              <Checkbox
                checked={localSelection.includes(pair)}
                onChange={() => handleCheckboxChange(pair)}
              />
            }
            label={pair}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PairSelectionDialog;
