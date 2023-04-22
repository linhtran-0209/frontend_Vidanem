import axios from 'axios';
import { Alert, Button, Dialog, DialogActions, DialogContent, TextField, FormControl, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export function CreateTitleModal(props) {
  const [year, setYear] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [selectedDateBatDau, setSelectedDateBatDau] = useState(moment());
  const [selectedDateKetThuc, setSelectedDateKetThuc] = useState(moment());

  const handleSubmit = async () => {
    try {
      console.log(year);
      const url = `${process.env.REACT_APP_API_URL}/namhoc/insert`;
      await axios
        .post(
          url,
          {
            maNamHoc: year.maNamHoc,
            namHoc: year.namHoc,
            batDau: year.batDau,
            ketThuc: year.ketThuc,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      setOpenErrMessage(err.response.data.message);
    }
  };

  const handleDateBatDauChange = (date) => {
    console.log(date);
    setSelectedDateBatDau(date);
    setYear({ ...year, batDau: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
  };

  const handleDateKetThucChange = (date) => {
    console.log(date);
    setSelectedDateKetThuc(date);
    setYear({ ...year, ketThuc: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
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

      <Dialog className="dialogcreatescholarship" open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreatesholarship">
          {' '}
          Thêm chủ đề
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className="form__info__createscholarship">
          <div className="form__info__createscholarship__container">
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Mã chủ đề"
                onChange={(e) => setYear({ ...year, maNamHoc: e.target.value })}
                type="text"
                fullWidth
                style={{ background: 'white' }}
              />
            </FormControl>
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Chủ đề"
                style={{ background: 'white' }}
                onChange={(e) => setYear({ ...year, namHoc: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
          </div>
          <div className="form__info__createscholarship__container">
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <TextField
                placeholder="Ghi chú"
                
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
              />
            </FormControl>
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Ngày bắt đầu"
                  selected={selectedDateBatDau}
                  onChange={handleDateBatDauChange}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="huythemhocbong" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="themhocbong" onClick={handleSubmit}>
            Thêm năm học
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
