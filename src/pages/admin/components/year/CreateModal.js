import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export function CreateModal(props) {
  const [year, setYear] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [selectedDateBatDau, setSelectedDateBatDau] = useState(moment());
  const [selectedDateKetThuc, setSelectedDateKetThuc] = useState(moment());
  const [isChecked, setIsChecked] = useState(false);
  const [namHocError, setNamHocError] = useState(false);

  const handleSubmit = async () => {
    if (!year.namHoc) {
      setNamHocError(true);
    } else {
      setNamHocError(false);
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/insert`;
        await axios
          .post(
            url,
            {
              namHoc: year.namHoc,
              batDau: year.batDau,
              ketThuc: year.ketThuc,
              namHienTai: isChecked,
            },
            { withCredentials: true }
          )
          .then((data) => {
            setOpenSuccessMessage(data.data.message);
          });
        props.handleClose();
      } catch (err) {
        setOpenErrMessage(err.response.data.message);
      }
    }
  };

  const handleDateBatDauChange = (date) => {
    setSelectedDateBatDau(date);
    setYear({ ...year, batDau: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
  };

  const handleDateKetThucChange = (date) => {
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
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 30, top: 60 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 30, top: 60 }} severity="error">
          {openErrMessage}
        </Alert>
      )}

      <Dialog className="dialogcreatescholarship" open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreatesholarship">
          {' '}
          Thêm năm học
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
                label="Năm học"
                onChange={(e) => {
                  setNamHocError(false)
                  setYear({ ...year, namHoc: e.target.value })
                }}
                type="text"
                fullWidth
                style={{ background: 'white' }}
                error={namHocError}
                helperText={namHocError ? 'Vui lòng nhập họ tên' : 'Ví dụ: 2019-2020'}
              />
            </FormControl>
          </div>
          <div className="form__info__createscholarship__container">
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Ngày bắt đầu"
                  value={selectedDateBatDau}
                  onChange={handleDateBatDauChange}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Ngày kết thúc"
                  value={selectedDateKetThuc}
                  onChange={handleDateKetThucChange}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div style={{ marginLeft: '15px' }}>
            <FormControlLabel
              control={<Checkbox onChange={(e) => setIsChecked(e.target.checked)} checked={isChecked} />}
              label="Đây là năm học hiện tại"
            />
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
