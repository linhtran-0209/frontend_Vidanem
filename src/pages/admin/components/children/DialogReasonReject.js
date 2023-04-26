import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  Card,
  TextField,
  FormControl
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogHocTap } from './DialogHocTap';

export function DialogReasonReject(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [reason, setReason] = useState('')

  const handleSubmit = () => {
    props.handleReject(reason)
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);
  return (
    <>
      <Dialog open={props.openDialog} onClose={props.handleClose}>
        <DialogTitle>Lí do trả về</DialogTitle>
        <DialogContent>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <textarea
                id="hoanCanh"
                label="Lí do trả về *"
                type="text"
                placeholder="Lí do trả về"
                // value={treEm.hoanCanh || ''}
                onChange={(e) => setReason(e.target.value )}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Huỷ</Button>
          <Button autoFocus onClick={handleSubmit}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
