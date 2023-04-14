import axios from 'axios';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [year, setYear] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [selectedDateBatDau, setSelectedDateBatDau] = useState(moment());
  const [selectedDateKetThuc, setSelectedDateKetThuc] = useState(moment());

  useEffect(() => {
    if (props.row) {
      getYear();
    }
  }, [props.row]);

  const getYear = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/namhoc/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setYear(data.data);
    } catch (err) {
      console.log(err);
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

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/namhoc/update`;

      await axios
        .put(
          url,
          {
            id: props.row._id,
            maNamHoc: year.maNamHoc,
            namHoc: year.namHoc,
            batDau: year.batDau,
            ketThuc: year.ketThuc
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            setOpenSuccessMessage(res.data.message);
          } else setOpenErrMessage(res.data.message);
        });
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };
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

      <Dialog className='dialogupdatescholarship' open={props.setOpenDialogEdit} onClose={props.handleClose}>
      <div className="titleupdatescholarship">
          {' '}
          Cập nhật năm học
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className='form__info__createscholarship'>
        <div className='form__info__createscholarship__container'>
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth >
            <TextField
              margin="dense"
              label="Mã năm học"
              value={year.maNamHoc || ''}
              disabled
              // onChange={(e) => setYear({ ...year, maNamHoc: e.target.value })}
              type="text"
              fullWidth
              style={{background:'white'}}
              helperText="Ví dụ: 2019-2020"
            />
          </FormControl>
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Năm Học"
              style={{background:'white'}}
              value={year.namHoc || ''}
              onChange={(e) => setYear({ ...year, namHoc: e.target.value })}
              type="text"
              fullWidth
              helperText="Ví dụ: Năm học 2019-2020"
            />
          </FormControl>
          </div>
          <div className='form__info__createscholarship__container' >
          <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <LocalizationProvider  adapterLocale="vi" dateAdapter={AdapterMoment}>
                <DatePicker  format="DD/MM/YYYY" label="Ngày bắt đầu" selected={selectedDateBatDau} onChange={handleDateBatDauChange} />
              </LocalizationProvider>
            </FormControl>
            <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
              <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                <DatePicker format="DD/MM/YYYY" label="Ngày kết thúc" selected={selectedDateKetThuc} onChange={handleDateKetThucChange} />
              </LocalizationProvider>
            </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button className="huycapnhathocbong" onClick={props.handleClose}>Hủy</Button>
          <Button className="capnhathocbong" onClick={handleSubmit}>Cập nhật học bổng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
