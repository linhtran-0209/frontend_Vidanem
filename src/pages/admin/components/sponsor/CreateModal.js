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

export function CreateModal(props) {
    const [openMaDonVi, setOpenMaDonVi] = useState();
    const handleChangeMaDonVi = (event) => {
      setOpenMaDonVi(event.target.value);
    };
  const [openName, setOpenName] = useState('');
  const handleChangeName = (event) => {
    setOpenName(event.target.value);
  };
  const [openPhone, setOpenPhone] = useState('');
  const handleChangePhone = (event) => {
    setOpenPhone(event.target.value);
  };
  const [openTongSoLuong, setOpenTongSoLuong] = useState();
  const handleChangeTongSoLuong = (event) => {
    setOpenTongSoLuong(event.target.value);
  };
  const [openTongSoTien, setOpenTongSoTien] = useState();
  const handleChangeTongSoTien = (event) => {
    setOpenTongSoTien(event.target.value);
  };
  const [openMoTa, setOpenMoTa] = useState('');
  const handleChangeMoTa = (event) => {
    setOpenMoTa(event.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/sponsor/insert`;

      axios.post(
        url,
        {
            maDonVi:openMaDonVi,
            tenDonVi:openName,
            SDT:openPhone,
            tongSoLuong:openTongSoLuong,
            tongSoTien:openTongSoTien,
            moTa:openMoTa
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  console.log(openMaDonVi);
  console.log(openName);
  console.log(openPhone);
  console.log(openTongSoLuong);
  console.log(openTongSoTien);
  console.log(openMoTa);

  return (
    <Dialog open={props.openDialogCreate} onClose={props.handleClose}>
      <DialogTitle>Thêm nhà tài trợ mới</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText> */}
        <TextField 
        autoFocus 
        margin="dense" 
        id="code" 
        label="Mã đơn vị" 
        onChange={handleChangeMaDonVi}
        type="text" 
        fullWidth 
        variant="standard" 
        />
        <TextField 
        autoFocus 
        margin="dense" 
        id="name" 
        label="Họ và tên" 
        onChange={handleChangeName}
        type="text" 
        fullWidth 
        variant="standard" 

        />
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Số điện thoại"
          onChange={handleChangePhone}
          type="phone"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_luong"
          label="Tổng số lượng"
          onChange={handleChangeTongSoLuong}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_tien"
          label="Tổng số tiền"
          onChange={handleChangeTongSoTien}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField 
            autoFocus 
            margin="dense" 
            id="mo_ta" 
            label="Mô tả" 
            onChange={handleChangeMoTa}
            type="text" 
            fullWidth 
            variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Thêm nhà tài trợ</Button>
      </DialogActions>
    </Dialog>
  );
}
