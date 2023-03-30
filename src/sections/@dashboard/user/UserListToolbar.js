import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@mui/material';
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

export default function UserListToolbar({
  filterName,
  onFilterName,
  quan,
  handleChangeQuan,
  openWards,
  phuong,
  handleChangePhuong,
  onClickSearch,
}) {
  const [openDistricts, setOpenDistricts] = useState([]);
  useEffect(() => {
    getDistricts();
  }, []);
  const getDistricts = async () => {
    try {
      const url = `https://provinces.open-api.vn/api/p/79?depth=2`;
      const { data } = await axios.get(url);

      setOpenDistricts(data.districts);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledRoot
      sx={{
        height: 74,
      }}
    >
      <StyledSearch
        sx={{ height: 40 }}
        value={filterName}
        onChange={onFilterName}
        placeholder="Email..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
        <Select labelId="quan" id="quan" value={quan} onChange={handleChangeQuan} label="Quận" margin="dense">
          {openDistricts.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Phường</InputLabel>
        <Select labelId="phuong" id="phuong" value={phuong} onChange={handleChangePhuong} label="Phường" margin="dense">
          {openWards && (
            <>
              {openWards.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </>
          )}
        </Select>
      </FormControl>
      
      <Tooltip title="Tìm kiếm" sx={{ marginLeft: 2 }}>
        <Button variant="contained" onClick={onClickSearch}>
          Tìm kiếm
        </Button>
      </Tooltip>
    </StyledRoot>
  );
}
