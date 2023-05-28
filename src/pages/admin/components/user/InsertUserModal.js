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
import './InsertUserModal.css';

export function InsertUserModal(props) {
  const [account, setAccount] = useState({ email: '', hoTen: '' });
  const [enableQuan, setEnableQuan] = useState(false);
  const [enablePhuong, setEnablePhuong] = useState(false);
  const [openDistricts, setOpenDistricts] = useState([]);
  const [openQuan, setOpenQuan] = useState('');
  const [openWards, setOpenWards] = useState([]);
  const [openPhuong, setOpenPhuong] = useState('');
  const [openQuyen, setOpenQuyen] = useState('');
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const [textFieldEmailError, setTextFieldEmailError] = useState(false);
  const [textFieldHoTenError, setTextFieldHoTenError] = useState(false);
  const [selectedQuyenError, setSelectedQuyenError] = useState(false);
  const [selectedQuanError, setSelectedQuanError] = useState(false);
  const [selectedPhuongError, setSelectedPhuongError] = useState(false);
  const [detailEmailError, setdetailEmailError] = useState('');

  const getUser = async () => {
    try {
      const email = props.row.email || '';
      const url = `${process.env.REACT_APP_API_URL}/admin/account/byEmail?email=${email}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setAccount(data.data);
      setOpenQuyen(data.data.quyen);
      if (data.data.quyen === 1) {
        setEnablePhuong(false);
        setEnableQuan(false);
      } else if (data.data.quyen === 2) {
        setEnablePhuong(false);
        setEnableQuan(true);
      } else {
        setEnablePhuong(true);
        setEnableQuan(true);
      }

      if (data.data.ma_quan) {
        setOpenQuan(data.data.ma_quan);
        if (data.data.ma_phuong) {
          getWards(data.data.ma_quan);
          setOpenPhuong(data.data.ma_phuong);
        } else setOpenPhuong('');
      } else {
        setOpenQuan('');
        setOpenPhuong('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.row.email) {
      getUser();
    }
  }, [props.row]);

  const handleChangeQuyen = (event) => {
    setOpenQuyen(event.target.value);
    if (event.target.value === 1) {
      setEnablePhuong(false);
      setEnableQuan(false);
    } else if (event.target.value === 2) {
      setEnablePhuong(false);
      setEnableQuan(true);
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

  const getWards = async (quan) => {
    try {
      const url = `https://provinces.open-api.vn/api/d/${quan}?depth=2`;
      const { data } = await axios.get(url);
      setOpenWards(data.wards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDistricts();
  }, []);

  const handleChangeQuan = async (event) => {
    setOpenQuan(event.target.value);
    setSelectedQuanError(false);

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
    setSelectedPhuongError(false);
  };

  const handleSubmit = async () => {
    // Kiểm tra định dạng email
    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    if (!account.email) {
      setTextFieldEmailError(true);
      setdetailEmailError('Vui lòng nhập email');
    } else {
      console.log(validateEmail(account.email));
      if (validateEmail(account.email) === false) {
        setTextFieldEmailError(true);
        setdetailEmailError('Nhập sai định dạng email');
      } else setTextFieldEmailError(false);
    }
    if (!account.hoTen) {
      setTextFieldHoTenError(true);
    } else setTextFieldHoTenError(false);
    if (!openQuyen) {
      setSelectedQuyenError(true);
    } else {
      setSelectedQuyenError(false);
      if (openQuyen === 2) {
        if (!openQuan) {
          setSelectedQuanError(true);
        } else setSelectedQuanError(false);
      } else if (openQuyen === 3) {
        if (!openQuan) {
          setSelectedQuanError(true);
        } else setSelectedQuanError(false);
        if (!openPhuong) {
          setSelectedPhuongError(true);
        } else setSelectedPhuongError(false);
      }
    }
    console.log({ email: account.email, hoTen: account.hoTen, quyen: openQuyen, quan: openQuan, phuong: openPhuong });
    if (
      account.email &&
      validateEmail(account.email) &&
      account.hoTen &&
      openQuyen &&
      ((openQuyen === 2 && openQuan) || (openQuyen === 3 && openQuan && openPhuong) || openQuyen === 1)
    ) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/account/update`;

        await axios
          .put(
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
            if (data.status === 200) {
              setOpenSuccessMessage(data.data.message);
            } else setOpenErrMessage(data.data.message);
          });
        props.handleClose();
      } catch (err) {
        console.log(err);
        setOpenErrMessage(err.response.data.message);
      }
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
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 50, top: 150 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 50, top: 150 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Dialog className="dialogInsertUser" open={props.openDialogInsert} onClose={props.handleClose}>
        <div className="titleupdateuser">
          {' '}
          Cập nhật tài khoản
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className="form__info">
          <div className="form__info__container">
            <FormControl className="formcontrolupdateuser" variant="standard" fullWidth>
              {account.quyen === 1 ? (
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  disabled
                  id="email"
                  value={account.email || ''}
                  label="Địa chỉ Email *"
                  onChange={(e) => {
                    setTextFieldEmailError(false);
                    setAccount({ ...account, email: e.target.value });
                  }}
                  type="email"
                  fullWidth
                  error={textFieldEmailError}
                  helperText={textFieldEmailError && detailEmailError}
                />
              ) : (
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="email"
                  value={account.email || ''}
                  label="Địa chỉ Email *"
                  onChange={(e) => {
                    setTextFieldEmailError(false);
                    setAccount({ ...account, email: e.target.value });
                  }}
                  type="email"
                  fullWidth
                  error={textFieldEmailError}
                  helperText={textFieldEmailError && detailEmailError}
                />
              )}
            </FormControl>
            <FormControl className="formcontrolupdateuser" variant="standard" fullWidth>
              {account.quyen === 1 ? (
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  disabled
                  id="hoTen"
                  value={account.hoTen || ''}
                  label="Họ tên *"
                  onChange={(e) => {
                    setTextFieldHoTenError(false);
                    setAccount({ ...account, hoTen: e.target.value });
                  }}
                  type="text"
                  fullWidth
                  error={textFieldHoTenError}
                  helperText={textFieldHoTenError && 'Vui lòng nhập họ tên'}
                />
              ) : (
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ tên *"
                  value={account.hoTen || ''}
                  onChange={(e) => {
                    setTextFieldHoTenError(false);
                    setAccount({ ...account, hoTen: e.target.value });
                  }}
                  type="text"
                  fullWidth
                  error={textFieldHoTenError}
                  helperText={textFieldHoTenError && 'Vui lòng nhập họ tên'}
                />
              )}
            </FormControl>
          </div>
          <FormControl
            className="formcontrolupdate__changerole"
            style={{ backgroundColor: 'whitesmoke' }}
            variant="outlined"
            fullWidth
          >
            <InputLabel id="demo-simple-select-standard-label">Quyền</InputLabel>
            {account.quyen === 1 ? (
              <Select
                labelId="quyen"
                id="quyen"
                disabled
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
            ) : (
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
            )}
            {selectedQuyenError && (
              <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn quyền cho tài khoản</div>
            )}
          </FormControl>

          <div className="form__update__address">
            <div className="form__update__address__info">
              {enableQuan && (
                <div className="form__update__address__quan">
                  <FormControl className="formcontrolupdateuser" variant="outlined" fullWidth>
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
                    {selectedQuanError && (
                      <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>
                        Vui lòng chọn quận/thành phố cho tài khoản
                      </div>
                    )}
                  </FormControl>
                </div>
              )}
            </div>

            <div className="form__update__address__info">
              {enablePhuong && (
                <div className="form__update__address__phuong">
                  <FormControl className="formcontrolupdateuser" variant="outlined" fullWidth>
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
                    {selectedPhuongError && (
                      <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>
                        Vui lòng chọn phường/xã cho tài khoản
                      </div>
                    )}
                  </FormControl>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={props.handleClose}>Hủy</Button> */}
          <Button className="capnhat" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
