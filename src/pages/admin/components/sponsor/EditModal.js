import axios from 'axios';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from '@mui/material';
// import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [SPONSER, setSPONSER] = useState({});
  const [preview, setPreview] = useState(null);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    if (props.row.id) {
      getSponser();
    }
  }, [props.row]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSPONSER({ ...SPONSER, logo: file });
    }
  };

  const getSponser = async () => {
    try {
      console.log(props.row);
      const url = `${process.env.REACT_APP_API_URL}/sponsor/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setSPONSER(data.data);
      setPreview(data.data.logo);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/sponsor/update?id=${props.row._id}`;

      const formData = new FormData();
      formData.append('logo', SPONSER.logo);
      formData.append('maDonVi', SPONSER.maDonVi);
      formData.append('tenDonVi', SPONSER.tenDonVi);
      formData.append('SDT', SPONSER.SDT);
      formData.append('gioiThieu', SPONSER.gioiThieu);
      console.log(formData);
      axios
        .put(url, formData, {
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
                  height: 200,
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
            <div className="divider" />
            <DialogContent>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      // borderRadius: '30%',
                      objectFit: 'cover',
                      height: 200,
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

              <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Mã đơn vị"
                  onChange={(e) => setSPONSER({ ...SPONSER, maDonVi: e.target.value })}
                  value={SPONSER.maDonVi || ''}
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Tên đơn vị tài trợ"
                  onChange={(e) => setSPONSER({ ...SPONSER, tenDonVi: e.target.value })}
                  value={SPONSER.tenDonVi || ''}
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Số điện thoại"
                  onChange={(e) => setSPONSER({ ...SPONSER, SDT: e.target.value })}
                  value={SPONSER.SDT || ''}
                  type="phone"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Giới thiệu"
                  onChange={(e) => setSPONSER({ ...SPONSER, gioiThieu: e.target.value })}
                  value={SPONSER.gioiThieu || ''}
                  type="text"
                  fullWidth
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleClose}>Hủy</Button>
              <Button onClick={handleSubmit}>Cập nhật nhà tài trợ</Button>
            </DialogActions>
          </Dialog>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Cập nhật nhà tài trợ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
