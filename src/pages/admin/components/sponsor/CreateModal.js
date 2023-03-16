import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function CreateModal(props) {
  const [SPONSER, setSPONSER] = useState({});

  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  
  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/insert`;

      axios.post(
        url,
        {
          maDonVi: SPONSER.maDonVi,
          tenDonVi: SPONSER.tenDonVi,
          SDT: SPONSER.SDT,
          tongSoLuong: SPONSER.tongSoLuong,
          tongSoTien: SPONSER.tongSoTien,
          moTa: SPONSER.moTa,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
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
    <Dialog open={props.openDialogCreate} onClose={props.handleClose}>
      <DialogTitle>Thêm nhà tài trợ mới</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Mã đơn vị"
          onChange={(e) => setSPONSER({ ...SPONSER, maDonVi: e.target.value })}
          value={SPONSER.maDonVi || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tên đơn vị tài trợ"
          onChange={(e) => setSPONSER({ ...SPONSER, tenDonVi: e.target.value })}
          value={SPONSER.tenDonVi || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Số điện thoại"
          onChange={(e) => setSPONSER({ ...SPONSER, SDT: e.target.value })}
          value={SPONSER.SDT || ''}
          type="phone"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_luong"
          label="Tổng số lượng"
          onChange={(e) => setSPONSER({ ...SPONSER, tongSoLuong: e.target.value })}
          value={SPONSER.tongSoLuong || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_tien"
          label="Tổng số tiền"
          onChange={(e) => setSPONSER({ ...SPONSER, tongSoTien: e.target.value })}
          value={SPONSER.tongSoTien || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="mo_ta"
          label="Mô tả"
          onChange={(e) => setSPONSER({ ...SPONSER, moTa: e.target.value })}
          value={SPONSER.moTa || ''}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Thêm nhà tài trợ</Button>
      </DialogActions>
    </Dialog>
    </>
  );
  
}
