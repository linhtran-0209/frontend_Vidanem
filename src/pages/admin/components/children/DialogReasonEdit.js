import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export function DialogReasonEdit(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [reason, setReason] = useState('');
  const [textReasonError, setTextReasonError] = useState(false);

  const handleSubmit = () => {
    if (!reason) {
      setTextReasonError(true);
    } else {
      setTextReasonError(false);
      props.handleRequestEdit(reason);
      props.handleClose();
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
        <DialogTitle>Lí do chỉnh sửa</DialogTitle>
        <DialogContent>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth >
              <TextField
              style={{height:'100%'}}
                id="hoanCanh"
                // label="Lí do chỉnh sửa *"
                type="text"
                placeholder="Lí do chỉnh sửa *"
                // value={treEm.hoanCanh || ''}
                onChange={(e) => {
                  setTextReasonError(false);
                  setReason(e.target.value);
                }}
                error={textReasonError}
                helperText={textReasonError && 'Vui lòng nhập lí do'}
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
