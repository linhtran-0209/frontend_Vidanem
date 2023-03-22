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
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [scholarship, setScholarship] = useState({});
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [changed, setChanged] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const getSponsorList = async () => {
    const url = `http://localhost:5000/api/v1/sponsor/getAll`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSPONSERLIST(data.data);
  };

  useEffect(() => {
    getSponsorList();
  }, []);

  useEffect(() => {
    if (props.row) {
      getScholarship();
    }
  }, [props.row]);

  const getScholarship = async () => {
    try {
      const url = `http://localhost:5000/api/v1/scholarship/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setScholarship(data.data);
      console.log(data.data.donViTaiTro);
      setSelected(data.data.donViTaiTro);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setChanged(true);
    setSelected(e.target.value);
    setScholarship({ ...scholarship, donViTaiTro: e.target.value });
    console.log(selected);
  };

  const defaultSelectedValue = selected;

  const handleSubmit = async () => {
    try {
      console.log(selected);
      const url = `http://localhost:5000/api/v1/scholarship/update?id=${props.row._id}`;

      // await axios
      //   .post(
      //     url,
      //     {
      //       maHocBong: scholarship.maHocBong,
      //       tenHocBong: scholarship.tenHocBong,
      //       donViTaiTro: scholarship.donViTaiTro,
      //       soLuong: scholarship.soLuong,
      //       soTien: scholarship.soTien,
      //       hinhThuc: scholarship.hinhThuc,
      //       ghiChu: scholarship.ghiChu,
      //     },
      //     { withCredentials: true }
      //   )
      //   .then((res) => {
      //     if (res.status === 200) {
      //       setOpenSuccessMessage(res.data.message);
      //     } else setOpenErrMessage(res.data.message);
      //   });
      // props.handleClose();
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

      <Dialog open={props.setOpenDialogEdit} onClose={props.handleClose}>
        <DialogTitle>Cập nhật học bổng</DialogTitle>
        <div className="divider" />
        <DialogContent>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Mã học bổng"
              value={scholarship.maHocBong || ''}
              onChange={(e) => setScholarship({ ...scholarship, maHocBong: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Tên học bổng"
              value={scholarship.tenHocBong || ''}
              onChange={(e) => setScholarship({ ...scholarship, tenHocBong: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="outlined" fullWidth>
            <Select
              onChange={handleChange}
              label="Đơn vị tài trợ"
              defaultSelectedValue={selected}
              value={selected}
              fullWidth
              margin="dense"
              defaultValue={selected}
            >
              <TextField
                autoFocus
                placeholder="Tên đơn vị tài trợ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                inputProps={{
                  autoComplete: "off"
                }}
              />

              {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.tenDonVi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Số lượng"
              value={scholarship.soLuong || ''}
              onChange={(e) => setScholarship({ ...scholarship, soLuong: e.target.value })}
              type="phone"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Số tiền mỗi suất"
              value={scholarship.soTien || ''}
              onChange={(e) => setScholarship({ ...scholarship, soTien: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Hình thức"
              value={scholarship.hinhThuc || ''}
              onChange={(e) => setScholarship({ ...scholarship, hinhThuc: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrolcreateuser" variant="standard" fullWidth>
            <TextField
              margin="dense"
              label="Ghi chú"
              value={scholarship.ghiChu || ''}
              onChange={(e) => setScholarship({ ...scholarship, ghiChu: e.target.value })}
              type="text"
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Cập nhật nhà tài trợ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
