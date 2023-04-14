import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function DialogHocTap(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [hocTap, setHocTap] = useState({});

  const handleSubmit = async () => {
    if (props.isEdit) {
      props.handleCickEdit(hocTap);
    } else props.handleCickAdd(hocTap);
    props.handleClose();
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

      <Dialog open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreateuser">
          {' '}
          Thông tin học tập
          {/* <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton> */}
        </div>
        <div className="divider" />
        {props.isEdit ? (
          <DialogContent>
            <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Năm học"
                defaultValue={props.infoHocTap.namHoc}
                onChange={(e) => setHocTap({ ...hocTap, namHoc: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Học kỳ"
                defaultValue={props.infoHocTap.hocKy}
                onChange={(e) => setHocTap({ ...hocTap, hocKy: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Học lực"
                defaultValue={props.infoHocTap.hocLuc}
                onChange={(e) => setHocTap({ ...hocTap, hocLuc: e.target.value })}
                type="phone"
                fullWidth
              />
            </FormControl>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <label label="Thành tích *" htmlFor="thanh-tich" style={{ marginTop: 15 }}>
                  Thành tích
                </label>
                <textarea
                  id="thanh-tich"
                  label="Thành tích *"
                  type="text"
                  defaultValue={props.infoHocTap.thanhTich}
                  onChange={(e) => setHocTap({ ...hocTap, thanhTich: e.target.value })}
                  placeholder="Thành tích"
                  style={{ margin: 0, backgroundColor: 'aliceblue' }}
                />
              </FormControl>
            </div>
          </DialogContent>
        ) : (
          <DialogContent>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Năm học"
              onChange={(e) => setHocTap({ ...hocTap, namHoc: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Học kỳ"
              onChange={(e) => setHocTap({ ...hocTap, hocKy: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Học lực"
              onChange={(e) => setHocTap({ ...hocTap, hocLuc: e.target.value })}
              type="phone"
              fullWidth
            />
          </FormControl>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <label label="Thành tích *" htmlFor="thanh-tich" style={{ marginTop: 15 }}>
                Thành tích
              </label>
              <textarea
                id="thanh-tich"
                label="Thành tích *"
                type="text"
                onChange={(e) => setHocTap({ ...hocTap, thanhTich: e.target.value })}
                placeholder="Thành tích"
                style={{ margin: 0, backgroundColor: 'aliceblue' }}
              />
            </FormControl>
          </div>

        </DialogContent>
        )}
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>{props.isEdit ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
