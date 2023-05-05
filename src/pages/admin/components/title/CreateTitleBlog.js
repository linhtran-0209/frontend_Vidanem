import axios from 'axios';
import { Alert, Button, Dialog, DialogActions, DialogContent, TextField, FormControl, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export function CreateTitleModal(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [title, setTitle] = useState({});
  const [preview, setPreview] = useState(null);

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/chude/insert`;

      const formData = new FormData();
      formData.append('image', title.hinhAnh);
      formData.append('tenChuDe', title.tenChuDe);

      await axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((data) => {
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      setOpenErrMessage(err.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setTitle({ ...title, hinhAnh: file });
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

      <Dialog className="dialogcreatescholarship" open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreatesholarship">
          {' '}
          Thêm chủ đề
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className="form__info__createscholarship">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: 300,
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
          <label
            htmlFor="image-input"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
          >
            <Button variant="contained" color="primary" component="span">
              Chọn Hình ảnh
            </Button>
          </label>
          <div className="form__info__createscholarship__container">
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Chủ đề"
                onChange={(e) => setTitle({ ...title, tenChuDe: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="huythemhocbong" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="themhocbong" onClick={handleSubmit}>
            Thêm chủ đề
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
