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
  IconButton,
  InputLabel,
  Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

export function DialogHocBong(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [SCHOLARSHIPLIST, setSCHOLARSHIPLIST] = useState([]);
  const [search, setSearch] = useState('');
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [hocBong, setHocBong] = useState({});

  const [selectedDonViError, setSelectedDonViError] = useState(false);
  const [selectedHocBongError, setSelectedHocBongError] = useState(false);
  const [textFieldNamNhanError, setTextFieldNamNhanError] = useState(false);
  const [textFieldNamHoanThanhError, setTextFieldNamHoanThanhError] = useState(false);

  const getSponsorList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSPONSERLIST(data.data);
  };

  useEffect(() => {
    getSponsorList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(props.infoHocBong).length > 0) {
        setHocBong(props.infoHocBong);
        setSelectedSponsor(props.infoHocBong.donViBaoTro._id);
        await getScholarshipList(props.infoHocBong.donViBaoTro._id);
        setSelectedScholarship(props.infoHocBong.hocBong._id);
      }
    };
    fetchData();
  }, [props.infoHocBong]);

  const handleChangeSponsor = (e) => {
    setSelectedDonViError(false);
    setSelectedSponsor(e.target.value);
    getScholarshipList(e.target.value);
    const donVi = SPONSERLIST.find((x) => x._id === e.target.value);
    setHocBong({ ...hocBong, donViBaoTro: donVi });
  };

  const handleChangeScholarship = (e) => {
    setSelectedHocBongError(false);
    setSelectedScholarship(e.target.value);
    const hocbong = SCHOLARSHIPLIST.find((x) => x._id === e.target.value);
    setHocBong({ ...hocBong, hocBong: hocbong });
  };

  const getScholarshipList = async (donViBaoTro) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/scholarship/getAll?donViBaoTro=${donViBaoTro}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSCHOLARSHIPLIST(data.data);
  };

  const handleSubmit = async () => {
    if (!hocBong.donViBaoTro) {
      setSelectedDonViError(true);
    } else setSelectedDonViError(false);
    if (!hocBong.hocBong) {
      setSelectedHocBongError(true);
    } else setSelectedHocBongError(false);
    if (!hocBong.namNhan) {
      setTextFieldNamNhanError(true);
    } else setTextFieldNamNhanError(false);
    if (!hocBong.namHoanThanh) {
      setTextFieldNamHoanThanhError(true);
    } else setTextFieldNamHoanThanhError(false);

    if (hocBong.donViBaoTro && hocBong.hocBong && hocBong.namNhan && hocBong.namHoanThanh) {
      if (props.isEdit) {
        props.handleCickEdit(hocBong);
      } else props.handleCickAdd(hocBong);
      props.handleClose();
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
          Thông tin học bổng
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        {props.isEdit ? (
          <DialogContent className="form__info__createscholarship">
            <div className="form__info__createscholarship__container">
              <FormControl className="formcontrolcreatesholarship" variant="outlined" fullWidth>
                <div>
                  <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
                  <Select
                    onChange={handleChangeSponsor}
                    label="Đơn vị tài trợ"
                    value={selectedSponsor || ''}
                    fullWidth
                    margin="dense"
                    style={{ border: setSelectedDonViError ? '1px solid red' : '' }}
                  >
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
                    <MenuItem value="">--------------Chọn đơn vị---------------</MenuItem>
                    {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                      <MenuItem key={option._id} value={option._id} label={option.tenDonVi}>
                        {option.tenDonVi}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {setSelectedDonViError && (
                  <div style={{ backgroundColor: 'white', color: 'red', marginTop: 4, fontSize: '13px' }}>
                    Vui lòng chọn đơn vị bảo trợ
                  </div>
                )}
              </FormControl>
              <FormControl className="formcontrolcreatesholarship" variant="outlined" fullWidth>
                <div>
                  <InputLabel id="demo-simple-select-standard-label">Học bổng</InputLabel>
                  <Select
                    onChange={handleChangeScholarship}
                    label="Học bổng"
                    value={selectedScholarship || ''}
                    fullWidth
                    margin="dense"
                  >
                    {/* {SCHOLARSHIPLIST.filter((option) => option.tenHocBong.toLowerCase().includes(search)).map((option) => ( */}
                    {[{ _id: 'none', tenHocBong: 'Chọn học bổng' }, ...SCHOLARSHIPLIST].map((option) => (
                      <MenuItem key={option._id} value={option._id} label={option.tenHocBong}>
                        {option.tenHocBong}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </FormControl>
            </div>
            <div className="form__info__createscholarship__container">
              <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Năm nhận"
                  value={hocBong.namNhan}
                  onChange={(e) => setHocBong({ ...hocBong, namNhan: e.target.value })}
                  type="number"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Năm hoàn thành"
                  value={hocBong.namHoanThanh}
                  onChange={(e) => setHocBong({ ...hocBong, namHoanThanh: e.target.value })}
                  type="number"
                  fullWidth
                />
              </FormControl>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="form__info__createscholarship">
            <div className="form__info__createscholarship__container">
              <FormControl className="formcontrolcreatesholarship" variant="outlined" fullWidth>
                <div>
                  <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
                  <Select
                    onChange={handleChangeSponsor}
                    label="Đơn vị tài trợ"
                    fullWidth
                    margin="dense"
                    style={{ border: selectedDonViError ? '1px solid red' : '' }}
                  >
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
                    <MenuItem value="">--------------Chọn đơn vị---------------</MenuItem>
                    {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                      <MenuItem key={option._id} value={option._id} label={option.tenDonVi}>
                        {option.tenDonVi}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {selectedDonViError && (
                  <div style={{ backgroundColor: 'white', color: 'red', marginTop: 4, fontSize: '13px' }}>
                    Vui lòng chọn đơn vị bảo trợ
                  </div>
                )}
              </FormControl>
              <FormControl className="formcontrolcreatesholarship" variant="outlined" fullWidth>
                <div>
                  <InputLabel id="demo-simple-select-standard-label">Học bổng</InputLabel>
                  <Select
                    onChange={handleChangeScholarship}
                    label="Học bổng"
                    fullWidth
                    margin="dense"
                    style={{ border: selectedHocBongError ? '1px solid red' : '' }}
                  >
                    {/* {SCHOLARSHIPLIST.filter((option) => option.tenHocBong.toLowerCase().includes(search)).map((option) => ( */}
                    {SCHOLARSHIPLIST.map((option) => (
                      <MenuItem key={option._id} value={option._id} label={option.tenHocBong}>
                        {option.tenHocBong}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {selectedHocBongError && (
                  <div style={{ backgroundColor: 'white', color: 'red', marginTop: 4, fontSize: '13px' }}>
                    Vui lòng chọn học bổng
                  </div>
                )}
              </FormControl>
            </div>
            <div className="form__info__createscholarship__container">
              <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Năm nhận"
                  onChange={(e) => {
                    setHocBong({ ...hocBong, namNhan: e.target.value });
                    setTextFieldNamNhanError(false);
                  }}
                  type="number"
                  fullWidth
                  error={textFieldNamNhanError}
                  helperText={textFieldNamNhanError && 'Vui lòng nhập năm nhận'}
                />
              </FormControl>
              <FormControl className="formcontrolcreatesholarship" variant="standard" fullWidth>
                <TextField
                  margin="dense"
                  label="Năm hoàn thành"
                  onChange={(e) => {
                    setHocBong({ ...hocBong, namHoanThanh: e.target.value });
                    setTextFieldNamHoanThanhError(false);
                  }}
                  type="number"
                  fullWidth
                  error={textFieldNamHoanThanhError}
                  helperText={textFieldNamHoanThanhError && 'Vui lòng nhập năm hoàn thành'}
                />
              </FormControl>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button className="huythemhocbong" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="themhocbong" onClick={handleSubmit}>
            {props.isEdit ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
