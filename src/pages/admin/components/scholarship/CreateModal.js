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
  InputLabel,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function CreateModal(props) {
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [scholarship, setScholarship] = useState({});
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  // useEffect(async () => {
  //   const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
  //   const { data } = await axios.get(url, { withCredentials: true });
  //   const result = data.data.filter((option) => option.tenDonVi.toLowerCase().includes(search));
  //   setSPONSERLIST(result);
  // }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setScholarship({ ...scholarship, donViTaiTro: e.target.value._id });
  };

  const handleSubmit = async () => {
    try {
      // console.log(scholarship);
      const url = `${process.env.REACT_APP_API_URL}/scholarship/insert`;
      await axios
        .post(
          url,
          {
            maHocBong: scholarship.maHocBong,
            tenHocBong: scholarship.tenHocBong,
            donViTaiTro: scholarship.donViTaiTro,
            soLuong: scholarship.soLuong,
            soTien: scholarship.soTien,
            hinhThuc: scholarship.hinhThuc,
            ghiChu: scholarship.ghiChu,
          },
          { withCredentials: true }
        )
        .then((data) => {
          // console.log(data.data.message);
          setOpenSuccessMessage(data.data.message);
        });
    } catch (err) {
      setOpenErrMessage(err.response.data.message);
    }
  };

  const getSponsorList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSPONSERLIST(data.data);
  };
  useEffect(() => {
    getSponsorList();
  }, []);

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
          Thêm học bổng
          {/* <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton> */}
        </div>
        <div className="divider" />
        <DialogContent>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Mã học bổng"
              onChange={(e) => setScholarship({ ...scholarship, maHocBong: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Tên học bổng"
              onChange={(e) => setScholarship({ ...scholarship, tenHocBong: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
            <Select onChange={handleChange} label="Đơn vị tài trợ" value={selected} fullWidth margin="dense">
              <TextField
                placeholder="Tên đơn vị tài trợ..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
              />

              {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                <MenuItem key={option._id} value={option} label={option.tenDonVi}>
                  {option.tenDonVi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Số lượng"
              onChange={(e) => setScholarship({ ...scholarship, soLuong: e.target.value })}
              type="phone"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Số tiền mỗi suất"
              onChange={(e) => setScholarship({ ...scholarship, soTien: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Hình thức"
              onChange={(e) => setScholarship({ ...scholarship, hinhThuc: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Ghi chú"
              onChange={(e) => setScholarship({ ...scholarship, ghiChu: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Thêm nhà học bổng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
