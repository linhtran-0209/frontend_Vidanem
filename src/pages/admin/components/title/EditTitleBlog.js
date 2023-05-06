import axios from 'axios';
import { Alert, Button, Dialog, DialogActions, DialogContent, TextField, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function EditTitleBlog(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [title, setTitle] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (props.row._id) {
      getTilte();
    }
  }, [props.row._id]);

  const getTilte = async () => {
    try {
      console.log(props.row);
      const url = `${process.env.REACT_APP_API_URL}/chude/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setTitle(data.data);
      setPreview(`${process.env.REACT_APP_API_URL}${data.data.hinhAnh}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/chude/update`;

      const formData = new FormData();
      formData.append('id', title._id);
      formData.append('image', title.hinhAnh);
      formData.append('tenChuDe', title.tenChuDe);

      await axios
        .put(url, formData, {
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
    // props.handleClose()
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
      <Dialog className="dialogcreatescholarship" open={props.setOpenDialogEdit} onClose={props.handleClose}>
        {openSuccessMessage && (
          <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 100 }} severity="success">
            {openSuccessMessage}
          </Alert>
        )}

        {openErrMessage && (
          <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 100 }} severity="error">
            {openErrMessage}
          </Alert>
        )}
        <div className="titlecreatesholarship">
          {' '}
          Chủ đề
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
              Chọn ảnh khác
            </Button>
          </label>
          <div className="form__info__createscholarship__container">
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Chủ đề"
                value={title.tenChuDe || ''}
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
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
