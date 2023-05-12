import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function CreateUserModal(props) {
  useEffect(() => {
    getDistricts();
  }, []);

  const [account, setAccount] = useState({ email: '', hoTen: '' });
  const [openQuyen, setOpenQuyen] = useState(3);
  const [enableQuan, setEnableQuan] = useState(true);
  const [enablePhuong, setEnablePhuong] = useState(true);
  const [openDistricts, setOpenDistricts] = useState([]);
  const [openQuan, setOpenQuan] = useState('');
  const [openWards, setOpenWards] = useState([]);
  const [openPhuong, setOpenPhuong] = useState('');
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleChangeQuyen = (event) => {
    setOpenQuyen(event.target.value);
    if (event.target.value === 1) {
      setEnablePhuong(false);
      setEnableQuan(false);
      setOpenQuan('');
      setOpenPhuong('');
    } else if (event.target.value === 2) {
      setEnablePhuong(false);
      setEnableQuan(true);
      setOpenPhuong('');
    } else {
      setEnablePhuong(true);
      setEnableQuan(true);
    }
  };

  const getDistricts = async () => {
    try {
      const url = `https://provinces.open-api.vn/api/p/79?depth=2`;
      const { data } = await axios.get(url);

      setOpenDistricts(data.districts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeQuan = async (event) => {
    setOpenQuan(event.target.value);
    try {
      const url = `https://provinces.open-api.vn/api/d/${event.target.value}?depth=2`;
      const { data } = await axios.get(url);
      setOpenWards(data.wards);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePhuong = async (event) => {
    setOpenPhuong(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/account/insert`;
      await axios
        .post(
          url,
          {
            email: account.email,
            hoTen: account.hoTen,
            ma_quan: openQuan,
            ma_phuong: openPhuong,
            quyen: openQuyen,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setOpenSuccessMessage(data.data.message);
        });
        props.handleClose();
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

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 50, top: 150 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 50, top: 150 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Dialog className="dialogCreateUser" open={props.opendialogcreate} onClose={props.handleClose}>
        <div className="titlecreateuser">
          {' '}
          Thêm tài khoản mới
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className='form__info'>
        <div className='form__info__container'>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="email"
              label="Địa chỉ Email *"
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
              type="email"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="hoTen"
              label="Họ tên *"
              onChange={(e) => setAccount({ ...account, hoTen: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          </div>
          <FormControl
            className="formcontrol__changerole"
            style={{ backgroundColor: 'whitesmoke' }}
            variant="outlined"
            fullWidth
          >
            <InputLabel id="demo-simple-select-standard-label">Quyền</InputLabel>
            <Select
              labelId="quyen"
              id="quyen"
              value={openQuyen}
              onChange={handleChangeQuyen}
              label="Quyền"
              fullWidth
              margin="dense"
            >
              <MenuItem value={1}>Hội đồng Đội Thành phố</MenuItem>
              <MenuItem value={2}>Hội đồng Đội quận, huyện</MenuItem>
              <MenuItem value={3}>Cấp Liên Đội</MenuItem>
            </Select>
          </FormControl>
          <div className='form__address'>
          <div className='form__address__info'>
          {enableQuan && (
            <div className='form__address__quan'>
            <FormControl className="formcontrolcreateuser" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
              <Select
                labelId="quan"
                id="quan"
                value={openQuan}
                onChange={handleChangeQuan}
                label="Quận"
                fullWidth
                margin="dense"
              >
                {openDistricts.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
          )}
          </div>

          <div className='form__address__info'>
          {enablePhuong && (
            <div className='form__address__phuong'>
            <FormControl className="formcontrolcreateuser" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Phường</InputLabel>
              <Select
                labelId="phuong"
                id="phuong"
                value={openPhuong}
                onChange={handleChangePhuong}
                label="Phường"
                fullWidth
                margin="dense"
              >
                {openWards.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
          )}
        </div>
        
        </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Hủy</Button> */}
          <Button className="themtaikhoan" onClick={handleSubmit}>
            Thêm tài khoản
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
