import axios from 'axios';
import {
  Alert,
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
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const handleChangeQuyen = (event) => {
    setOpenQuyen(event.target.value);
  };
  //   console.log(openQuyen);

  const handleSubmit = async () => {
    console.log(openQuyen);
    console.log(props.email);
    try {
      const url = `http://localhost:5000/api/v1/account/updateRole`;

      axios
        .put(
          url,
          {
            email: props.email,
            quyen: openQuyen,
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data.data.message);
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      console.log(err);
      setOpenErrMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);
  // console.log(props.quyen)
  return (
    <>
    
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top:200 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Dialog className='testtt' open={props.opendialogtt} onClose={props.handleClose}>
        <DialogTitle>Cập nhật quyền người dùng</DialogTitle>
        <DialogContent>
          <FormControl
            style={{ backgroundColor: 'whitesmoke' }}
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
    </>
  );
}
