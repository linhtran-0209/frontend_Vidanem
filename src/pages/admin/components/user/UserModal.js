import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Email } from '@mui/icons-material';

export function UserModal({ opendialogcreate, handleClose }) {
  useEffect(() => {
    getDistricts();
  }, []);
  const [openEmail, setOpenEmail] = useState('');
  const [openQuyen, setOpenQuyen] = useState('');
  const [openDistricts, setOpenDistricts] = useState([]);
  const [openQuan, setOpenQuan] = useState('');
  const [openWards, setOpenWards] = useState([]);
  const [openPhuong, setOpenPhuong] = useState('');

  const handleChangeEmail = (event) => {
    setOpenEmail(event.target.value);
  };
  const handleChangeQuyen = (event) => {
    setOpenQuyen(event.target.value);
  };

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

  const handleChangeQuan = async (event) => {
    setOpenQuan(event.target.value);
    try {
      const url = `https://provinces.open-api.vn/api/d/${event.target.value}?depth=2`;
      const { data } = await axios.get(url);
      setOpenWards(data.wards);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleChangePhuong = async (event) => {
    console.log(event.target.value);
    setOpenPhuong(event.target.value);
  };
  const handleSubmit = async () => {
    console.log(openEmail);
    console.log(openQuan);
    console.log(openPhuong);
    try {
      const url = `http://localhost:5000/account/insert`;
      axios.post(
        url,
        {
          email: openEmail,
          ma_quan: openQuan,
          ma_phuong: openPhuong,
        },
        { withCredentials: true }
        // {
        //   headers: {
        //     Set-Cookie: acessToken = 63ef355c2a154459f53df7ea%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTVjMmExNTQ0NTlmNTNkZjdlYSIsImVtYWlsIjoidHJhbnRoaWtoYW5obGluaDAyMDkyMDAxQGdtYWlsLmNvbSIsInF1eWVuIjoxLCJpYXQiOjE2NzgwMTg5NzIsImV4cCI6MTY3ODAxOTU3Mn0.9BNFN0oj92RfhRcaIPxuuM2amBXw-QctoAT12FHX6D8

        //   }
        // }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={opendialogcreate} onClose={handleClose}>
      <DialogTitle>Thêm tài khoản mới</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
         To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Địa chỉ Email"
          onChange={handleChangeEmail}
          type="email"
          fullWidth
          variant="standard"
        />
        {/* <TextField
         autoFocus
         margin="dense"
         id="isVerified"
         label="Quyền"
         type="text"
         fullWidth
         variant="standard"
        /> */}

        <FormControl
          variant="standard"
          sx={{
            m: 0,
            minWidth: 550,
          }}
        >
          <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
          <Select
            autoFocus
            labelId="quan"
            id="quan"
            // value={}
            onChange={handleChangeQuan}
            label="Quận"
            fullWidth
            margin="dense"
          >
            {openDistricts.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          sx={{
            m: 0,
            minWidth: 550,
          }}
        >
          <InputLabel id="demo-simple-select-standard-label">Phường</InputLabel>
          <Select
            autoFocus
            labelId="phuong"
            id="phuong"
            // value={phuong}
            onChange={handleChangePhuong}
            label="Phường"
            fullWidth
            margin="dense"
          >
            {openWards.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Thêm tài khoản</Button>
      </DialogActions>
    </Dialog>
  );
}
