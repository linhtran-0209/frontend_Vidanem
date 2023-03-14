import axios from 'axios';
import {
  Alert,
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
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

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
    try {
      const url = `http://localhost:5000/account/insert`;
      await axios
        .post(
          url,
          {
            email: openEmail,
            ma_quan: openQuan,
            ma_phuong: openPhuong,
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data.data.message);
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      console.log(err);
      setOpenErrMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Dialog  open={opendialogcreate} onClose={handleClose}>
        <DialogTitle>Thêm tài khoản mới</DialogTitle>
        <DialogContent>
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
    </>
  );
}
