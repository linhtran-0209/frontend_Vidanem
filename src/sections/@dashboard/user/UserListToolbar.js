import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, FormControl, InputLabel, Select, Button } from '@mui/material';
// component
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <StyledRoot
      sx={{
        height:50,
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch sx={{height:40}}
          value={filterName}
          onChange={onFilterName}
          placeholder="Email..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        
      )}
 
      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
              <Select
                labelId="quan"
                id="quan"
                // value={openQuan}
                // onChange={handleChangeQuan}
                label="Quận"
                
                margin="dense"
              >
                {/* {openDistricts.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Phường</InputLabel>
              <Select
                labelId="quan"
                id="quan"
                // value={openQuan}
                // onChange={handleChangeQuan}
                label="Quận"
                
                margin="dense"
              >
                {/* {openDistricts.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Quyền</InputLabel>
              <Select
                labelId="quan"
                id="quan"
                // value={openQuan}
                // onChange={handleChangeQuan}
                label="Quận"
                
                margin="dense"
              >
                {/* {openDistricts.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            <Tooltip title="Tìm kiếm" sx={{marginLeft: 2}}>
        <Button variant="contained" >
            Tìm kiếm
        </Button>
       
        </Tooltip>
    </StyledRoot>
  );
}
