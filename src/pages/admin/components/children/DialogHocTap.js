import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export function DialogHocTap(props) {
  const [hocTap, setHocTap] = useState({});
  const [YearsList, setYearsList] = useState([]);
  const [selectedNamHoc, setSelectedNamHoc] = useState(null);
  const [selectedHocKy, setSelectedHocKy] = useState(null);
  const [selectedHocLuc, setSelectedHocLuc] = useState(null);

  const [selectedNamHocError, setSelectedNamHocError] = useState(false);
  const [selectedHocKyError, setSelectedHocKyError] = useState(false);
  const [selectedHocLucError, setSelectedHocLucError] = useState(false);

  const handleSubmit = async () => {
    if (!hocTap.namHoc) {
      setSelectedNamHocError(true);
    } else setSelectedNamHocError(false);
    if (!hocTap.hocKy) {
      setSelectedHocKyError(true);
    } else setSelectedHocKyError(false);
    if (!hocTap.hocLuc) {
      setSelectedHocLucError(true);
    } else setSelectedHocLucError(false);

    if (hocTap.namHoc && hocTap.hocKy && hocTap.hocLuc){
      if (props.isEdit) {
        props.handleCickEdit(hocTap);
      } else props.handleCickAdd(hocTap);
      props.handleClose();
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      setHocTap(props.infoHocTap);
      setSelectedNamHoc(props.infoHocTap.namHoc);
      setSelectedHocKy(props.infoHocTap.hocKy);
      setSelectedHocLuc(props.infoHocTap.hocLuc);
    } else {
      getYears();
    }
  }, [props.openDialogCreate]);

  const getYears = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setYearsList(data.data);
      const namHienTai = data.data.find((nam) => nam.namHienTai === true);
      if (!props.isEdit) {
        setSelectedNamHoc(namHienTai.namHoc);
        setHocTap({ ...hocTap, namHoc: namHienTai.namHoc })
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeNamHoc = (e) => {
    setSelectedNamHocError(false);
    setSelectedNamHoc(e.target.value);
    setHocTap({ ...hocTap, namHoc: e.target.value });
  };

  const handleChangeHocKy = (e) => {
    setSelectedHocKyError(false);
    setSelectedHocKy(e.target.value);
    setHocTap({ ...hocTap, hocKy: e.target.value });
  };

  const handleChangeHocLuc = (e) => {
    setSelectedHocLucError(false);
    setSelectedHocLuc(e.target.value);
    setHocTap({ ...hocTap, hocLuc: e.target.value });
  };

  return (
    <>
      <Dialog className="dialogcreatehoctap" open={props.openDialogCreate} onClose={props.handleClose}>
        <div className="titlecreatehoctap">
          {' '}
          Thông tin học tập
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />

        {props.isEdit ? (
          <DialogContent className="form_info_hoctap">
            <div className="form__info__hoctap__container">
              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Năm học</InputLabel>
                <Select onChange={handleChangeNamHoc} label="Năm học" value={selectedNamHoc} fullWidth margin="dense">
                  {YearsList.map((option) => (
                    <MenuItem key={option._id} value={option.namHoc} label={option.namHoc}>
                      {option.namHoc}
                    </MenuItem>
                  ))}
                </Select>
              {selectedNamHocError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn năm học</div>}
              </FormControl>
              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Học kỳ</InputLabel>
                <Select
                  onChange={handleChangeHocKy}
                  label="Năm học"
                  value={selectedHocKy || ''}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem key={'HK1'} value={'Học Kỳ 1'} label={'Học Kỳ 1'}>
                    Học Kỳ 1
                  </MenuItem>
                  <MenuItem key={'HK2'} value={'Học Kỳ 2'} label={'Học Kỳ 2'}>
                    Học Kỳ 2
                  </MenuItem>
                </Select>
              {selectedHocKyError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn học kỳ</div>}
              </FormControl>

              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Học lực</InputLabel>
                <Select
                  onChange={handleChangeHocLuc}
                  label="Năm học"
                  value={selectedHocLuc || ''}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem key={'gioi'} value={'Giỏi'} label={'Giỏi'}>
                    Giỏi
                  </MenuItem>
                  <MenuItem key={'kha'} value={'Khá'} label={'Khá'}>
                    Khá
                  </MenuItem>
                  <MenuItem key={'tb'} value={'Trung bình'} label={'Trung bình'}>
                    Trung bình
                  </MenuItem>
                  <MenuItem key={'yeu'} value={'Yếu'} label={'Yếu'}>
                    Yếu
                  </MenuItem>
                </Select>
              {selectedHocLucError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn học lực</div>}
              </FormControl>

            </div>
            <div className="container__hoctap__hoancanh">
              <FormControl className="formcontrol__hoctap__hoancanh" variant="standard" fullWidth>
                <TextField
                  id="thanh-tich"
                  label="Thành tích *"
                  type="text"
                  multiline
                  rows={4}
                  defaultValue={props.infoHocTap.thanhTich}
                  onChange={(e) => {
                    setHocTap({ ...hocTap, thanhTich: e.target.value });
                  }}
                  placeholder="Thành tích"
                  style={{ margin: 0 }}
  
                />
              </FormControl>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="form_info_hoctap">
            <div className="form__info__hoctap__container">
              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Năm học</InputLabel>
                <Select
                  onChange={handleChangeNamHoc}
                  value={selectedNamHoc || ''}
                  label="Năm học"
                  fullWidth
                  margin="dense"
                >
                  {YearsList.map((option) => (
                    <MenuItem key={option._id} value={option.namHoc} label={option.namHoc}>
                      {option.namHoc}
                    </MenuItem>
                  ))}
                </Select>
                {selectedNamHocError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn năm học</div>}
              </FormControl>

              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Học kỳ</InputLabel>
                <Select onChange={handleChangeHocKy} label="Năm học" fullWidth margin="dense">
                  <MenuItem key={'HK1'} value={'Học Kỳ 1'} label={'Học Kỳ 1'}>
                    Học Kỳ 1
                  </MenuItem>
                  <MenuItem key={'HK2'} value={'Học Kỳ 2'} label={'Học Kỳ 2'}>
                    Học Kỳ 2
                  </MenuItem>
                </Select>
                {selectedHocKyError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn học kỳ</div>}
              </FormControl>

              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Học lực</InputLabel>
                <Select onChange={handleChangeHocLuc} label="Năm học" fullWidth margin="dense">
                  <MenuItem key={'gioi'} value={'Giỏi'} label={'Giỏi'}>
                    Giỏi
                  </MenuItem>
                  <MenuItem key={'kha'} value={'Khá'} label={'Khá'}>
                    Khá
                  </MenuItem>
                  <MenuItem key={'tb'} value={'Trung bình'} label={'Trung bình'}>
                    Trung bình
                  </MenuItem>
                  <MenuItem key={'yeu'} value={'Yếu'} label={'Yếu'}>
                    Yếu
                  </MenuItem>
                </Select>
              {selectedHocLucError && <div style={{backgroundColor:'white', color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn học lực</div>}
              </FormControl>
            </div>
            <div className="container__hoctap__hoancanh">
              <FormControl className="formcontrol__hoctap__hoancanh" variant="standard" fullWidth>
                <TextField
                  id="thanh-tich"
                  label="Thành tích"
                  type="text"
                  multiline
                  rows={3}
                  onChange={(e) => {
                    setHocTap({ ...hocTap, thanhTich: e.target.value });
                  }}
                  placeholder="Thành tích"
                  style={{ margin: 0 }}
                />
              </FormControl>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button className="huythemhoctap" onClick={props.handleClose}>
            Hủy
          </Button>
          <Button className="themhoctap" onClick={handleSubmit}>
            {props.isEdit ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
