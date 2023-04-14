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
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export function DialogHocTap(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [hocTap, setHocTap] = useState({});
  const [YearsList, setYearsList] = useState([]);
  const [selectedNamHoc, setSelectedNamHoc] = useState(null);
  const [selectedHocKy, setSelectedHocKy] = useState(null);

  const handleSubmit = async () => {
    if (props.isEdit) {
      props.handleCickEdit(hocTap);
    } else props.handleCickAdd(hocTap);
    props.handleClose();
  };

  useEffect(() => {
    getYears();
  }, []);

  const getYears = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/namhoc/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setYearsList(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeNamHoc = (e) => {
    setSelectedNamHoc(e.target.value);
    // setYear({ ...hocTap, idNamHoc: e.target.value._id });
    setHocTap({ ...hocTap, namHoc: e.target.value._id });
    setHocTap({ ...hocTap, maNamHoc: e.target.value.maNamHoc });
  };

  const handleChangeHocKy = (e) => {
    setSelectedHocKy(e.target.value);
    setHocTap({ ...hocTap, hocKy: e.target.value._id });
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

      <Dialog className="dialogcreateyear" open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreateyear">
          {' '}
          Thông tin học tập
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />

        {props.isEdit ? (
          <DialogContent className="form_year">
            <div className="form__year__container">
              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
                {/* <InputLabel id="demo-simple-select-standard-label">Năm học</InputLabel>
              <TextField
                margin="dense"
                label="Năm học"
                defaultValue={props.infoHocTap.namHoc}
                onChange={(e) => setHocTap({ ...hocTap, namHoc: e.target.value })}
                type="text"
                fullWidth
              /> */}
                <Select onChange={handleChangeNamHoc} label="Năm học" value={selectedNamHoc} fullWidth margin="dense">
                  {YearsList.map((option) => (
                    <MenuItem key={option._id} value={option} label={option.tenDonVi}>
                      {option.tenDonVi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Học kỳ"
                  defaultValue={props.infoHocTap.hocKy}
                  onChange={(e) => setHocTap({ ...hocTap, hocKy: e.target.value })}
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
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
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="form_year">
            <div className="form__year__container">
              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
                {/* <TextField
                  margin="dense"
                  label="Năm học"
                  onChange={(e) => setHocTap({ ...hocTap, namHoc: e.target.value })}
                  type="text"
                  fullWidth
                /> */}
                <InputLabel id="demo-simple-select-standard-label">Năm học</InputLabel>
                <Select onChange={handleChangeNamHoc} label="Năm học" value={selectedNamHoc} fullWidth margin="dense">
                  {YearsList.map((option) => (
                    <MenuItem key={option._id} value={option} label={option.namHoc}>
                      {option.namHoc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Học kỳ"
                  onChange={(e) => setHocTap({ ...hocTap, hocKy: e.target.value })}
                  type="text"
                  fullWidth
                />
              </FormControl>

              <FormControl className="formcontrolcreateyear" variant="standard" fullWidth>
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
