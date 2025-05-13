import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const NigerianStatesDropdown = ({ value, onChange, label = "State" }) => {
  const states = [
    'Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Delta',
    'Kaduna', 'Ogun', 'Enugu', 'Others'
  ];

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      required
    >
      {states.map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default NigerianStatesDropdown;