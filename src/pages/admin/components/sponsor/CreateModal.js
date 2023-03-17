import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
  Avatar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function CreateModal(props) {
  const [SPONSER, setSPONSER] = useState({logo: null});
  const [preview, setPreview] = useState(null);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file))
      setSPONSER({ ...SPONSER, logo: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/insert`;

      const formData = new FormData();
      formData.append('logo', SPONSER.logo);
      formData.append('maDonVi', SPONSER.maDonVi);
      formData.append('tenDonVi', SPONSER.tenDonVi);
      formData.append('SDT', SPONSER.SDT);
      formData.append('tongSoLuong', SPONSER.tongSoLuong);
      formData.append('tongSoTien', SPONSER.tongSoTien);
      formData.append('moTa', SPONSER.moTa);
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setOpenSuccessMessage(res.data.message);
          } else setOpenErrMessage(res.data.message);
        });
    } catch (err) {
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  borderRadius: '30%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
          <input
            accept="image/*"
            id="image-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-input"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
          >
            <Button variant="contained" color="primary" component="span">
              Chọn Logo
            </Button>
          </label>

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
