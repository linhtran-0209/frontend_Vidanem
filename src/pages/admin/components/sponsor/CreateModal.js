import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function CreateModal(props) {
  const [SPONSER, setSPONSER] = useState({ logo: null });
  const [preview, setPreview] = useState(null);

  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const [imageError, setImageError] = useState(false);
  const [textFieldMaDonViError, setTextFieldMaDonViError] = useState(false);
  const [textFieldTenDonViError, setTextFieldTenDonViError] = useState(false);
  const [textFieldDiaChiError, setTextFieldDiaChiError] = useState(false);
  const [textFieldSDTError, setTextFieldSDTError] = useState(false);
  const [textFieldGioiThieuError, setTextFieldGioiThieuError] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSPONSER({ ...SPONSER, logo: file });
      setImageError(false);
    }
  };

  const handleSubmit = async () => {
    if (!SPONSER.logo) {
      setImageError(true);
    } else setImageError(false);
    if (!SPONSER.maDonVi) {
      setTextFieldMaDonViError(true);
    } else setTextFieldMaDonViError(false);
    if (!SPONSER.tenDonVi) {
      setTextFieldTenDonViError(true);
    } else setTextFieldTenDonViError(false);
    if (!SPONSER.diaChi) {
      setTextFieldDiaChiError(true);
    } else setTextFieldDiaChiError(false);
    if (!SPONSER.SDT) {
      setTextFieldSDTError(true);
    } else setTextFieldSDTError(false);
    if (!SPONSER.gioiThieu) {
      setTextFieldGioiThieuError(true);
    } else setTextFieldGioiThieuError(false);

    if (SPONSER.logo && SPONSER.maDonVi && SPONSER.tenDonVi && SPONSER.diaChi && SPONSER.SDT && SPONSER.gioiThieu) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/insert`;

        const formData = new FormData();
        formData.append('logo', SPONSER.logo);
        formData.append('maDonVi', SPONSER.maDonVi);
        formData.append('tenDonVi', SPONSER.tenDonVi);
        formData.append('diaChi', SPONSER.diaChi);
        formData.append('SDT', SPONSER.SDT);
        formData.append('gioiThieu', SPONSER.gioiThieu);
        axios
          .post(url, formData, {
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
      <Dialog className="dialogcreatesponsor" open={props.openDialogCreate} onClose={props.handleClose}>
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
        <div className="titlecreatesponsor">
          {' '}
          Thêm nhà tài trợ mới
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className="form__info__createsponsor">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  // borderRadius: '30%',
                  objectFit: 'cover',
                  height: 300,
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
          {imageError && (
            <Typography component="span" variant="body2" style={{ textAlign: 'center', color: 'red' }}>
              <p>Vui lòng chọn logo ảnh cho đơn vị bảo trợ</p>
            </Typography>
          )}
          <label
            htmlFor="image-input"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
          >
            <Button variant="contained" color="primary" component="span">
              Chọn Logo
            </Button>
          </label>

          <FormControl className="formcontrolcreatesponsor" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Mã đơn vị"
              onChange={(e) => {
                setTextFieldMaDonViError(false);
                setSPONSER({ ...SPONSER, maDonVi: e.target.value });
              }}
              value={SPONSER.maDonVi || ''}
              type="text"
              fullWidth
              error={textFieldMaDonViError}
              helperText={textFieldMaDonViError && 'Vui lòng nhập mã đơn vị'}
            />
          </FormControl>
          <FormControl className="formcontrolcreatesponsor" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Tên đơn vị bảo trợ"
              onChange={(e) => {
                setTextFieldTenDonViError(false);
                setSPONSER({ ...SPONSER, tenDonVi: e.target.value });
              }}
              value={SPONSER.tenDonVi || ''}
              type="text"
              fullWidth
              error={textFieldTenDonViError}
              helperText={textFieldTenDonViError && 'Vui lòng nhập tên đơn vị'}
            />
          </FormControl>
          <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Địa chỉ"
              onChange={(e) => {
                setTextFieldSDTError(false);
                setSPONSER({ ...SPONSER, diaChi: e.target.value });
              }}
              value={SPONSER.diaChi || ''}
              type="phone"
              fullWidth
              error={textFieldDiaChiError}
              helperText={textFieldDiaChiError && 'Vui lòng nhập địa chỉ'}
            />
          </FormControl>
          <FormControl className="formcontrolcreatesponsor" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Số điện thoại"
              onChange={(e) => {
                setTextFieldSDTError(false);
                setSPONSER({ ...SPONSER, SDT: e.target.value });
              }}
              value={SPONSER.SDT || ''}
              type="phone"
              fullWidth
              error={textFieldSDTError}
              helperText={textFieldSDTError && 'Vui lòng nhập số điện thoại'}
            />
          </FormControl>
          <FormControl className="formcontrolcreatesponsor" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Giới thiệu"
              onChange={(e) => {
                setTextFieldGioiThieuError(false);
                setSPONSER({ ...SPONSER, gioiThieu: e.target.value });
              }}
              value={SPONSER.gioiThieu || ''}
              type="text"
              fullWidth
              error={textFieldGioiThieuError}
              helperText={textFieldGioiThieuError && 'Vui lòng nhập đoạn giới thiệu ngắn về đơn vị'}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className="huythemnhataitro" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="themnhataitro" onClick={handleSubmit}>
            Thêm nhà tài trợ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
