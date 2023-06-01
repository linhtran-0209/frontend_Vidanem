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

  const [textFieldMaHocBongError, setTextFieldMaHocBongError] = useState(false);
  const [textFieldTenHocBongError, setTextFieldTenHocBongError] = useState(false);
  const [selectedDonViBaoTroError, setSelectedDonViBaoTroError] = useState(false);
  const [textFieldSoLuongError, setTextFieldSoLuongError] = useState(false);
  const [textFieldSoTienError, setTextFieldSoTienError] = useState(false);
  const [textFieldHinhThucError, setTextFieldHinhThucError] = useState(false);
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
    setSelectedDonViBaoTroError(false);
    setSelected(e.target.value);
    setScholarship({ ...scholarship, donViBaoTro: e.target.value });
  };

  const defaultSelectedValue = selected;

  const handleSubmit = async () => {
    if (!scholarship.maHocBong) {
      setTextFieldMaHocBongError(true);
    } else setTextFieldMaHocBongError(false);
    if (!scholarship.tenHocBong) {
      setTextFieldTenHocBongError(true);
    } else setTextFieldTenHocBongError(false);
    if (!scholarship.donViBaoTro) {
      setSelectedDonViBaoTroError(true);
    } else setSelectedDonViBaoTroError(false);
    if (!scholarship.soLuong) {
      setTextFieldSoLuongError(true);
    } else setTextFieldSoLuongError(false);
    if (!scholarship.soTien) {
      setTextFieldSoTienError(true);
    } else setTextFieldSoTienError(false);
    if (!scholarship.hinhThuc) {
      setTextFieldHinhThucError(true);
    } else setTextFieldHinhThucError(false);

    if (
      scholarship.maHocBong &&
      scholarship.tenHocBong &&
      scholarship.donViBaoTro &&
      scholarship.soLuong &&
      scholarship.soTien &&
      scholarship.hinhThuc
    ) {
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
                      onChange={(e) => {
                        setTextFieldMaHocBongError(false);
                        setScholarship({ ...scholarship, maHocBong: e.target.value });
                      }}
                      type="text"
                      fullWidth
                      error={textFieldMaHocBongError}
                      helperText={textFieldMaHocBongError && 'Vui lòng nhập mã học bổng'}
                    />
                  </FormControl>
                  <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
                    <TextField
                      margin="dense"
                      label="Tên học bổng"
                      value={scholarship.tenHocBong || ''}
                      onChange={(e) => {
                        setTextFieldTenHocBongError(false);
                        setScholarship({ ...scholarship, tenHocBong: e.target.value });
                      }}
                      type="text"
                      fullWidth
                      error={textFieldTenHocBongError}
                      helperText={textFieldTenHocBongError && 'Vui lòng nhập tên học bổng'}
                    />
                  </FormControl>
                </div>
                <FormControl className="formcontrolupdatesholarship__name" variant="outlined" fullWidth>
                  <Select
                    onChange={handleChange}
                    label="Đơn vị tài trợ"
                    value={selected}
                    fullWidth
                    margin="dense"
                    style={{ border: selectedDonViBaoTroError ? '1px solid red' : '' }}
                  >
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
                  {selectedDonViBaoTroError && (
                    <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn đơn vị bảo trợ</div>
                  )}
                </FormControl>
                <div className="form__info__moneyupdatescholarship__container">
                  <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
                    <TextField
                      margin="dense"
                      label="Số lượng"
                      value={scholarship.soLuong || ''}
                      onChange={(e) => {
                        setTextFieldSoLuongError(false);
                        setScholarship({ ...scholarship, soLuong: e.target.value });
                      }}
                      type="number"
                      fullWidth
                      error={textFieldSoLuongError}
                      helperText={textFieldSoLuongError && 'Vui lòng nhập số lượng trẻ em được nhận'}
                    />
                  </FormControl>
                  <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
                    <TextField
                      margin="dense"
                      label="Số tiền mỗi suất"
                      value={scholarship.soTien || ''}
                      onChange={(e) => {
                        setTextFieldSoTienError(false);
                        setScholarship({ ...scholarship, soTien: e.target.value });
                      }}
                      type="number"
                      fullWidth
                      error={textFieldSoTienError}
                      helperText={textFieldSoTienError && 'Vui lòng nhập số tiền mỗi suất'}
                    />
                  </FormControl>
                  <FormControl className="formcontrolupdatesholarship" variant="standard" fullWidth>
                    <TextField
                      margin="dense"
                      label="Hình thức"
                      value={scholarship.hinhThuc || ''}
                      onChange={(e) => {
                        setTextFieldHinhThucError(false);
                        setScholarship({ ...scholarship, hinhThuc: e.target.value });
                      }}
                      type="text"
                      fullWidth
                      error={textFieldHinhThucError}
                      helperText={textFieldHinhThucError && 'Vui lòng nhập hình thức trao tặng học bổng'}
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
