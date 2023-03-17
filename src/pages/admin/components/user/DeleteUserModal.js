import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Alert, IconButton } from '@mui/material';

export function  DeleteUserModal(props) {
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
        className='dialogDeleteUser'
        open={props.openDialogDelete}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="titledeleteuser"> Cập nhật tài khoản
        <IconButton className onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        </div>
        <div className="divider" />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thật sự muốn xóa tài khoản, nếu bạn muốn xóa chọn "Đồng ý" và ngược lại.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='huyuser' onClick={props.handleClose}>Hủy</Button>
          <Button className='xoauser' onClick={handleSubmit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
