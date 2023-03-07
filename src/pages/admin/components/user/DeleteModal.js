import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



export function DeleteModal(props) {
  const element = document.querySelector('#delete-request-set-headers .status');
  const handleSubmit = async () => {
    console.log(props.email);
    console.log(props.quyen);
    try {
      const url = `http://localhost:5000/account/delete`;
  
      axios.put(
        url,
        {
          email: props.email,
           quyen: props.quyen,
        },
        { withCredentials: true }
        // {
        //   headers: {
        //     Set-Cookie: acessToken = 63ef355c2a154459f53df7ea%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTVjMmExNTQ0NTlmNTNkZjdlYSIsImVtYWlsIjoidHJhbnRoaWtoYW5obGluaDAyMDkyMDAxQGdtYWlsLmNvbSIsInF1eWVuIjoxLCJpYXQiOjE2NzgwMTg5NzIsImV4cCI6MTY3ODAxOTU3Mn0.9BNFN0oj92RfhRcaIPxuuM2amBXw-QctoAT12FHX6D8
  
        //   }
        // }
      )
    } catch (err) {
      console.log(err);
    }
  };
  return (
      <Dialog
        open={props.openDialogDelete}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Bạn có đồng ý xóa tài khoản ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thật sự muốn xóa tài khoản, nếu bạn muốn xóa chọn "Đồng ý" và ngược lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
  );
}
