import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';


export function DialogReasonReject(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [reason, setReason] = useState('')
  const [textReasonError, setTextReasonError] = useState(false);

  const handleSubmit = () => {
    if (!reason) {
      setTextReasonError(true)
    } else {
      setTextReasonError(false)
      props.handleReject(reason)
      props.handleClose()
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
      <Dialog open={props.openDialog} onClose={props.handleClose}>
        <DialogTitle>Lí do từ chối</DialogTitle>
        <DialogContent>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <TextField
                id="hoanCanh"
                label="Lí do từ chối *"
                type="text"
                placeholder="Lí do từ chối"
                onChange={(e) => {
                  setTextReasonError(false)
                  setReason(e.target.value )}
                }
                error={textReasonError}
                helperText={textReasonError && 'Vui lòng nhập lí do từ chối'}
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
