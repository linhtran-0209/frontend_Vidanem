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
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [scholarship, setScholarship] = useState({});
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const getSponsorList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll`;
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
      const url = `${process.env.REACT_APP_API_URL}/admin/scholarship/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setScholarship(data.data);
      setSelected(data.data.donViBaoTro);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    setScholarship({ ...scholarship, donViBaoTro: e.target.value });
  };

  const defaultSelectedValue = selected;

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/scholarship/update`;

      await axios
        .put(
          url,
          {
            id: props.row._id,
            maHocBong: scholarship.maHocBong,
            tenHocBong: scholarship.tenHocBong,
            donViBaoTro: scholarship.donViBaoTro,
            soLuong: scholarship.soLuong,
            soTien: scholarship.soTien,
            hinhThuc: scholarship.hinhThuc,
            ghiChu: scholarship.ghiChu,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            setOpenSuccessMessage(res.data.message);
          } else setOpenErrMessage(res.data.message);
        });
      // props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog className="dialogupdatescholarship" open={props.setOpenDialogEdit} onClose={props.handleClose}>
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
        <div className="titleupdatescholarship">
          {' '}
          Cập nhật học bổng
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent className="form__info__updatescholarship">
          <div className="form__info__updatescholarship__container">
            <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Mã học bổng"
                value={scholarship.maHocBong || ''}
                onChange={(e) => setScholarship({ ...scholarship, maHocBong: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Tên học bổng"
                value={scholarship.tenHocBong || ''}
                onChange={(e) => setScholarship({ ...scholarship, tenHocBong: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
          </div>
          <FormControl className="formcontrolupdatesholarship__name" variant="outlined" fullWidth>
            <Select onChange={handleChange} label="Đơn vị tài trợ" value={selected} fullWidth margin="dense">
              <TextField
                autoFocus
                placeholder="Tên đơn vị tài trợ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                }}
              />

              {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.tenDonVi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="form__info__moneyupdatescholarship__container">
            <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Số lượng"
                value={scholarship.soLuong || ''}
                onChange={(e) => setScholarship({ ...scholarship, soLuong: e.target.value })}
                type="phone"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Số tiền mỗi suất"
                value={scholarship.soTien || ''}
                onChange={(e) => setScholarship({ ...scholarship, soTien: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
              <TextField
                margin="dense"
                label="Hình thức"
                value={scholarship.hinhThuc || ''}
                onChange={(e) => setScholarship({ ...scholarship, hinhThuc: e.target.value })}
                type="text"
                fullWidth
              />
            </FormControl>
          </div>
          <FormControl className="formcontrolupdatesholarship__note" variant="standard" fullWidth>
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
          <Button className="huycapnhathocbong" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="capnhathocbong" onClick={handleSubmit}>
            Cập nhật học bổng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
