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

export function CreateModal(props) {
  const [doiTuong, setDoiTuong] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/doituong/insert`;
      await axios
        .post(
          url,
          {
            ma: doiTuong.ma,
            ten: doiTuong.ten,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setOpenSuccessMessage(data.data.message);
        });
        props.handleClose();
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

      <Dialog className='dialogcreatescholarship' open={props.openDialogCreate} onClose={props.handleClose}>
      <div className="titlecreatesholarship">
          {' '}
          Thêm đối tượng trẻ em
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className='form__info__createscholarship'>
        <div className='form__info__createscholarship__container'>
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth >
            <TextField
              margin="dense"
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
              onChange={(e) => setDoiTuong({ ...doiTuong, ten: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button className="huythemhocbong" onClick={props.handleClose}>Hủy</Button>
          <Button className="themhocbong" onClick={handleSubmit}>Thêm đối tượng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
