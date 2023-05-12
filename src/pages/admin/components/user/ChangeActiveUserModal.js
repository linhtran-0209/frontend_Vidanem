import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Alert, IconButton } from '@mui/material';

export function ChangeActiveUserModal(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/account/changeActive`;

      axios
        .put(
          url,
          {
            email: props.row.email,
            isActive: !props.row.isActive,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setOpenSuccessMessage(data.data.message);
        });
      props.handleClose();
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
        className="dialogDeleteUser"
        open={props.openDialogDelete}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="titledeleteuser">
          {' '}
          Cập nhật tài khoản
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent>
          {props.row.isActive && (
            <DialogContentText id="alert-dialog-description">
              <p>Bạn có thật sự muốn khóa tài khoản {props.row.email}? </p>
              <p>
                Nếu bạn muốn khóa chọn <b>"Đồng ý"</b> và ngược lại.
              </p>
            </DialogContentText>
          )}
          {!props.row.isActive && (
            <DialogContentText id="alert-dialog-description">
              <p>Bạn có thật sự muốn mở khóa tài khoản {props.row.email}? </p>
              <p>
                Nếu bạn muốn mở khóa chọn <b>"Đồng ý"</b> và ngược lại.
              </p>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button className="huyuser" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="xoauser" onClick={handleSubmit}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
