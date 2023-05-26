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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [doiTuong, setDoiTuong] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    if (props.row) {
      getDoiTuong();
    }
  }, [props.row]);

  const getDoiTuong = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/doituong/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setDoiTuong(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/doituong/update`;

      await axios
        .put(
          url,
          {
            id: props.row._id,
            ma: doiTuong.ma,
            ten: doiTuong.ten,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            setOpenSuccessMessage(res.data.message);
          } else setOpenErrMessage(res.data.message);
        });
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };
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

      <Dialog className="dialogupdatescholarship" open={props.setOpenDialogEdit} onClose={props.handleClose}>
        <div className="titleupdatescholarship">
          {' '}
          Cập nhật năm học
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className='form__info__createscholarship'>
        <div className='form__info__createscholarship__container'>
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth >
            <TextField
              margin="dense"
              value={doiTuong.ma || ''}
              label="Mã đối tượng"
              onChange={(e) => setDoiTuong({ ...doiTuong, ma: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth >
            <TextField
              margin="dense"
              label="Tên đối tượng"
              value={doiTuong.ten || ''}
              onChange={(e) => setDoiTuong({ ...doiTuong, ten: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button className="huycapnhathocbong" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="capnhathocbong" onClick={handleSubmit}>
            Cập nhật năm học
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
