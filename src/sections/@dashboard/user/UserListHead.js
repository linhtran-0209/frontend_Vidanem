import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
};

export default function UserListHead({
  rowCount,
  headLabel,
}) {


  return (
    <TableHead sx={{ height: 20 }}>
      <TableRow sx={{ height: 20 }}>
        {headLabel.map((headCell) => (
          <TableCell sx={{ height: 20, fontWeight: "bold" }} key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>

    </TableHead>
    
    
  );
  
}
