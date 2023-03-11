import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function InsertModal(props) {
  const [openQuyen, setOpenQuyen] = useState('');
  const handleChangeQuyen = (event) => {
    setOpenQuyen(event.target.value);
  };
//   console.log(openQuyen);
  
  const handleSubmit = async () => {
    console.log(openQuyen);
    console.log(props.email);
    try {
      const url = `http://localhost:5000/account/updateRole`;
    
      axios.put(
        url,
        {
          email: props.email,
          quyen: openQuyen,
        },
        { withCredentials: true }
        // {
        //   headers: {
        //     Set-Cookie: acessToken = 63ef355c2a154459f53df7ea%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTVjMmExNTQ0NTlmNTNkZjdlYSIsImVtYWlsIjoidHJhbnRoaWtoYW5obGluaDAyMDkyMDAxQGdtYWlsLmNvbSIsInF1eWVuIjoxLCJpYXQiOjE2NzgwMTg5NzIsImV4cCI6MTY3ODAxOTU3Mn0.9BNFN0oj92RfhRcaIPxuuM2amBXw-QctoAT12FHX6D8

        //   }
        // }
      );
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(props.quyen)
  return (
    <Dialog  open={props.opendialogtt} onClose={props.handleClose}>
      <DialogTitle>Cập nhật quyền người dùng</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
             To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText> */}
        <FormControl style= {{backgroundColor: 'whitesmoke'}}
          variant="standard"
          sx={{
            m: 0,
            minWidth: 250,
          }}
        >
          <InputLabel id="demo-simple-select-standard-label">Quyền</InputLabel>
          <Select
            autoFocus
            labelId="quyen"
            id="quyen"
            value={openQuyen}
            onChange={handleChangeQuyen}
            label="Quyền"
            fullWidth
            margin="dense"
          >
            
            <MenuItem value={'1'}>Quyền 1</MenuItem>
            <MenuItem value={'2'}>Quyền 2</MenuItem>
            <MenuItem value={'3'}>Quyền 3</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Cập nhật</Button>
      </DialogActions>
    </Dialog>
  );
}
