import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, FormControl, InputLabel, Select, TextField } from '@mui/material';
// component
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '10%',
  padding: theme.spacing(0, 1, 0, 5),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // '&.Mui-focused': {
  //   width: 320,
  //   boxShadow: theme.customShadows.z8,
  // },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

NewsToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function NewsToolbar({
  filterName,
  onFilterName,
  chuDe,
  handleChangeChuDe,

  sort,
  handleSort,
  onClickSearch,
}) {
  const [listChuDe, setListChuDe] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getChuDe();
  }, []);
  const getChuDe = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/chude/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setListChuDe(data.data);
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
        sx={{ height: 40, width: 200, marginRight: '16px' }}
        className="search__user"
        value={filterName}
        onChange={onFilterName}
        onBlur={onClickSearch}
        onKeyDown={onClickSearch}
        placeholder="Họ tên..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Chủ đề</InputLabel>
        <Select labelId="chude" id="chude" value={chuDe} onChange={handleChangeChuDe} label="Chủ đề" margin="dense">
          <MenuItem value="">Chọn Chủ đề</MenuItem>
          {listChuDe.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.tenChuDe}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField select size="small" value={sort} onChange={(e) => handleSort} style={{marginLeft: 'auto',marginRight: '12%'}}>
          <MenuItem key={'asc'} value={'asc'} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
            Mới nhất
          </MenuItem>
          <MenuItem key={'des'} value={'des'} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
            Cũ nhất
          </MenuItem>
        </TextField>
    </StyledRoot>
  );
}
