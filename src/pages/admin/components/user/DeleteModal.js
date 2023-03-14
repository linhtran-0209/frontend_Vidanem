import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';

export function DeleteModal(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleSubmit = async () => {
    console.log(props.email);
    console.log(props.quyen);
    try {
      const url = `http://localhost:5000/api/v1/account/delete`;

      axios
        .put(
          url,
          {
            email: props.email,
            quyen: props.quyen,
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data);
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      setOpenErrMessage(err.response.data.message);
      console.log(err);
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
      <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 150 }} severity="success">
        {openSuccessMessage}
      </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Dialog
        open={props.openDialogDelete}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Bạn có đồng ý xóa tài khoản ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thật sự muốn xóa tài khoản, nếu bạn muốn xóa chọn "Đồng ý" và ngược lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
