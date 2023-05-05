import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export function DialogHocTap(props) {
  const [hocTap, setHocTap] = useState({});
  const [YearsList, setYearsList] = useState([]);
  const [selectedNamHoc, setSelectedNamHoc] = useState(null);
  const [selectedHocKy, setSelectedHocKy] = useState(null);
  const [selectedHocLuc, setSelectedHocLuc] = useState(null);

  const handleSubmit = async () => {
    console.log(hocTap);
    if (props.isEdit) {
      props.handleCickEdit(hocTap);
    } else props.handleCickAdd(hocTap);
    props.handleClose();
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
      const url = `${process.env.REACT_APP_API_URL}/namhoc/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      setYearsList(data.data);
      const namHienTai = data.data.find((nam) => nam.namHienTai === true);
      console.log(namHienTai);
      if (!props.isEdit) setSelectedNamHoc(namHienTai.namHoc);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeNamHoc = (e) => {
    setSelectedNamHoc(e.target.value);
    console.log(e.target.value);
    setHocTap({ ...hocTap, namHoc: e.target.value });
  };

  const handleChangeHocKy = (e) => {
    setSelectedHocKy(e.target.value);
    setHocTap({ ...hocTap, hocKy: e.target.value });
  };

  const handleChangeHocLuc = (e) => {
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
              </FormControl>

              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Học kỳ</InputLabel>
                <Select onChange={handleChangeHocKy} label="Năm học" value={selectedHocKy || ''} fullWidth margin="dense">
                    <MenuItem key={'HK1'} value={'Học Kỳ 1'} label={'Học Kỳ 1'}>
                    Học Kỳ 1
                  </MenuItem>
                  <MenuItem key={'HK2'} value={'Học Kỳ 2'} label={'Học Kỳ 2'}>
                    Học Kỳ 2
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl className="formcontrolcreatehoctap" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Học lực</InputLabel>
                <Select onChange={handleChangeHocLuc} label="Năm học" value={selectedHocLuc || ''} fullWidth margin="dense">
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
              </FormControl>
              </div>
              <div className="container__hoctap__hoancanh">
                <FormControl className="formcontrol__hoctap__hoancanh" variant="standard" fullWidth>
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
              </FormControl>
              </div>
              <div className="container__hoctap__hoancanh">
                <FormControl className="formcontrol__hoctap__hoancanh" variant="standard" fullWidth>
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
            
          </DialogContent>
        )}
        <DialogActions>
          <Button className="huythemhoctap" onClick={props.handleClose}>Hủy</Button>
          <Button className="themhoctap" onClick={handleSubmit}>{props.isEdit ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
