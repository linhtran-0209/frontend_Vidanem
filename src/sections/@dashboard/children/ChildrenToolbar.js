import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, FormControl, InputLabel, Select, TextField } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  // justifyContent: 'space-between',
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

ChildrenToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ChildrenToolbar({
  filterName,
  onFilterName,
  doiTuong,
  handleChangeDoiTuong,
  quan,
  handleChangeQuan,
  openWards,
  phuong,
  handleChangePhuong,
  trangThai,
  handleChangeTrangThai,
  sponsor,
  handleChangeSponsor,
  onClickSearch,
}) {
  const [openDistricts, setOpenDistricts] = useState([]);
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [listDoiTuong, setListDoiTuong] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDistricts();
  }, []);
  const getDistricts = async () => {
    try {
      const url = `https://provinces.open-api.vn/api/p/79?depth=2`;
      const { data } = await axios.get(url);

      setOpenDistricts(data.districts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSponsor();
  }, []);
  const getSponsor = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setSPONSERLIST(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoiTuong();
  }, []);
  const getDoiTuong = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/doituong/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setListDoiTuong(data.data);
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

      {/* <StyledSearch
        sx={{ height: 40, width: 150, marginRight: '16px' }}
        className="search__user"
        value={filterNamNhan}
        onChange={onFilterNamNhan}
        onBlur={onClickSearch}
        onKeyDown={onClickSearch}
        placeholder="Năm nhận"
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      /> */}

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Đối tượng</InputLabel>
        <Select labelId="doituong" id="doituong" value={doiTuong} onChange={handleChangeDoiTuong} label="Đối tượng" margin="dense">
          <MenuItem value="">--------------Chọn Đối tượng-----------------</MenuItem>
          {listDoiTuong.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.ten}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
        <Select labelId="quan" id="quan" value={quan} onChange={handleChangeQuan} label="Quận" margin="dense">
          <MenuItem value="">Chọn Quận/Thành phố</MenuItem>
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
          <MenuItem value="">Chọn Phường/Xã</MenuItem>
          {openWards.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Trạng thái</InputLabel>
        <Select labelId="quyen" id="quyen" value={trangThai} onChange={handleChangeTrangThai} margin="dense">
          <MenuItem value="">Chọn trạng thái</MenuItem>
          <MenuItem value={'DeXuat'}>Đề Xuất</MenuItem>
          <MenuItem value={'ChoDuyet'}>Chờ Duyệt</MenuItem>
          <MenuItem value={'DaDuyet'}>Đã Duyệt</MenuItem>
          <MenuItem value={'TuChoi'}>Từ Chối</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="formcontrolsearch" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
        <Select onChange={handleChangeSponsor} label="Đơn vị tài trợ" value={sponsor} fullWidth margin="dense">
          <TextField
            placeholder="Tên đơn vị tài trợ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
          />
          <MenuItem value="">--------------Chọn đơn vị---------------</MenuItem>
          {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
            <MenuItem key={option._id} value={option._id} label={option.tenDonVi}>
              {option.tenDonVi}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledRoot>
  );
}
