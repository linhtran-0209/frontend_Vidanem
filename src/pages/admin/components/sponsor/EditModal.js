import axios from 'axios';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [SPONSER, setSPONSER] = useState({});
  const [preview, setPreview] = useState(null);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    if (props.id) {
      getSponser();
    }
  }, [props.id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSPONSER({ ...SPONSER, logo: file });
    }
  };

  const getSponser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/byId?id=${props.id._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setSPONSER(data.data);
      setPreview(data.data.logo)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/update?id=${props.id._id}`;

      const formData = new FormData();
      formData.append('logo', SPONSER.logo);
      formData.append('maDonVi', SPONSER.maDonVi);
      formData.append('tenDonVi', SPONSER.tenDonVi);
      formData.append('SDT', SPONSER.SDT);
      formData.append('tongSoLuong', SPONSER.tongSoLuong);
      formData.append('tongSoTien', SPONSER.tongSoTien);
      formData.append('moTa', SPONSER.moTa);
      console.log(formData);
      axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }).then(res => {
        console.log(1);
        if (res.status === 200) {
          console.log(2);
          setOpenSuccessMessage(res.data.message);
          console.log(3);
        } else setOpenErrMessage(res.data.message);
      });
      // props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

    <Dialog open={props.setOpenDialogEdit} onClose={props.handleClose}>
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
      <DialogTitle>Cập nhật nhà tài trợ</DialogTitle>
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
                height: 200
              }}
            />
          )}
        </div>
        <input accept="image/*" id="image-input" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
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
        <Button onClick={handleSubmit}>Cập nhật nhà tài trợ</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
