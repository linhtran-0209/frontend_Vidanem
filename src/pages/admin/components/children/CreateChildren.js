import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Card,
  Stack,
  Typography,
  FormControl,
  TextField,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../../components/iconify';

import 'react-datepicker/dist/react-datepicker.css';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';
import { DialogHocTap } from './DialogHocTap';
import { DialogHocBong } from './DialogHocBong';
import { DialogListDoiTuong } from './DialogListDoiTuong';

export default function InsertChildren() {
  const navigate = useNavigate();
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [treEm, setTreEm] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hocTap, setHocTap] = useState([]);
  const [hocBong, setHocBong] = useState([]);
  const [doiTuong, setDoiTuong] = useState([]);
  const [openDialogListDoiTuong, setOpenDialogListDoiTuong] = useState(false);
  const [openDialogHocTap, setOpenDialogHocTap] = useState(false);
  const [selectedHocTapIndex, setSelectedHocTapIndex] = useState(0);
  const [openDialogHocBong, setOpenDialogHocBong] = useState(false);
  const [selectedHocBongIndex, setSelectedHocBongIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [infoHocTap, setInfoHocTap] = useState({});
  const [infoHocBong, setInfoHocBong] = useState({});
  const [selectedDate, setSelectedSponsorDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

  const handleDateChange = (date) => {
    setSelectedSponsorDate(date);
    setTreEm({ ...treEm, ngaySinh: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
  };

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;
    const selectedImages = [];
    const images = [];

    // Kiểm tra số lượng ảnh đã chọn
    if (selectedFiles.length <= 4) {
      for (let i = 0; i < selectedFiles.length; i += 1) {
        const file = selectedFiles[i];
        images.push(file);
        const imageUrl = URL.createObjectURL(file);
        selectedImages.push(imageUrl);
      }
      setPreview(selectedImages);
      setImages(images);
    } else {
      alert('Bạn chỉ được chọn tối đa 4 ảnh!');
    }
  };

  const handleClickOpenDialogHocTap = () => {
    setOpenDialogHocTap(true);
  };

  const handleClickOpenDialogListDoiTuong = () => {
    setOpenDialogListDoiTuong(true);
  };

  const handleClickOpenDialogHocBong = () => {
    setOpenDialogHocBong(true);
  };

  const handleCloseDialogListDoiTuong = () => {
    setOpenDialogListDoiTuong(false);
  };

  const handleCloseDialog = () => {
    setOpenDialogHocTap(false);
  };

  const handleCloseDialogHocBong = () => {
    setOpenDialogHocBong(false);
  };

  const handleRemoveHocTap = (index) => {
    setHocTap((hoctap) => {
      const newHocTaps = [...hoctap];
      newHocTaps.splice(index, 1);
      return newHocTaps;
    });
  };

  const handleRemoveHocBong = (index) => {
    setHocBong((hocbong) => {
      const newHocBongs = [...hocbong];
      newHocBongs.splice(index, 1);
      return newHocBongs;
    });
  };

  const handleAddDoiTuong = (doituongs) => {
    setDoiTuong(doituongs);
  };

  const handleRemoveDoiTuong = (index) => {
    setDoiTuong((doituong) => {
      const newDoiTuongs = [...doituong];
      newDoiTuongs.splice(index, 1);
      return newDoiTuongs;
    });
  };

  const handleCickAddHocBong = (hocbong) => {
    setHocBong([...hocBong, hocbong]);
  };

  const handleCickAddHocTap = (hoctap) => {
    setHocTap([...hocTap, hoctap]);
  };

  const handleCickEditHocTap = (hoctap) => {
    const hoctaps = [...hocTap];
    hoctaps[selectedHocTapIndex] = hoctap;
    setHocTap(hoctaps);
    // setTreEm(hoctaps);
  };

  const handleCickEditHocBong = (hocbong) => {
    const hocbongs = [...hocBong];
    hocbongs[selectedHocBongIndex] = hocbong;
    setHocBong(hocbongs);
    // setTreEm(hoctaps);
  };

  const handleSubmit = async () => {
    const urlHocTap = `${process.env.REACT_APP_API_URL}/admin/hoctap/insert`;
    const urlHocBong = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/insert`;
    const urlHinhAnh = `${process.env.REACT_APP_API_URL}/admin/hinhanh/insert`;
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/insert`;

    const result = await axios.post(url, {
      hoTen: treEm.hoTen,
      ngaySinh: treEm.ngaySinh,
      truong: treEm.truong,
      SDT: treEm.SDT,
      diaChi: treEm.diaChi,
      hoanCanh: treEm.hoanCanh,
      doiTuong: doiTuong.map(doituong => doituong._id),
      donViBaoTro: hocBong.map(hocbong => hocbong.donViBaoTro._id)
    }, { withCredentials: true });

    if (result.status === 200) {
      setOpenSuccessMessage(result.data.message);
    } else setOpenErrMessage(result.data.message);
    if (result.data.id ) {
      // Insert ảnh
      if (images.length > 0) {
        images.forEach(async (image) => {
          const formData = new FormData();
          formData.append('image', image);
          formData.append('refId', result.data.id);
          await axios.post(urlHinhAnh, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        });
      }
      // Insert thông tin học tập
      if (hocTap.length > 0) {
        await axios.post(
          urlHocTap,
          {
            treEm: result.data.id,
            hocTaps: hocTap,
          },
          { withCredentials: true }
        );
      }
      // Insert thông tin học bổng
      if (hocBong.length > 0) {
        await axios.post(
          urlHocBong,
          {
            treEm: result.data.id,
            hocBongs: hocBong,
          },
          { withCredentials: true }
        );
      }


    }
    navigate(`/dashboard/children/edit/${result.data.id}`);
  };

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{position: 'fixed', zIndex: 500000, right: 30, top: 60 }} severity="success">
        {openSuccessMessage}
      </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 30, top: 60  }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {preview.length > 0 && (
                <img
                  src={preview[selectedImageIndex]}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    objectFit: 'cover',
                    height: 200,
                    // border: '2px solid Silver',
                  }}
                />
              )}
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              <Grid container spacing={2} columns={16}>
                {preview.length > 0 &&
                  preview.map((image, index) => (
                    <Grid key={index} item xs={4}>
                      <Card sx={{ p: 0.5 }} onClick={() => setSelectedImageIndex(index)}>
                        <img
                          src={image}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            borderRadius: '5%',
                            objectFit: 'cover',
                            height: 60,
                            border: '2px solid Silver',
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              style={{ display: 'none' }}
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="image-input"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
            >
              <Button variant="contained" color="primary" component="span">
                Ảnh đại diện
              </Button>
            </label>
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ overflowY: 'auto', height: 600 }}>
          <Card sx={{ p: 3 }}>
            <div className="container__ten">
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  onChange={(e) => setTreEm({ ...treEm, hoTen: e.target.value })}
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Ngày sinh"
                    selected={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <TextField
                  id="hoanCanh"
                  label="Địa chỉ *"
                  onChange={(e) => setTreEm({ ...treEm, diaChi: e.target.value })}
                  type="text"
                  placeholder="Địa chỉ"
                />
              </FormControl>
            </div>
            <div className="container__diachi">
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="SDT"
                  onChange={(e) => setTreEm({ ...treEm, SDT: e.target.value })}
                  label="Số điện thoại"
                  type="number"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="diaChi"
                  onChange={(e) => setTreEm({ ...treEm, truong: e.target.value })}
                  label="Trường *"
                  type="text"
                  fullWidth
                />
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                    <b style={{ fontSize: 20 }}>Thuộc diện đối tượng</b>
                  </label>

                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      handleClickOpenDialogListDoiTuong();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                </div>
              </FormControl>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: '20px', marginBottom: '10px' }}>
              {doiTuong.length > 0 &&
                doiTuong.map((doituong, index) => {
                  return (
                    <span
                      style={{ borderRadius: '16px', backgroundColor: '#EEEEEE', padding: '8px 1px 8px 12px', marginLeft: '10px', marginBottom:'5px' }}
                    >
                      {' '}
                      {doituong.ten}
                      <IconButton
                        className="button_remove_doituong"
                        onClick={() => {
                          handleRemoveDoiTuong(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </span>
                  );
                })}
            </div>

            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <textarea
                  id="hoanCanh"
                  label="Hoàn Cảnh *"
                  type="text"
                  placeholder="Hoàn cảnh"
                  onChange={(e) => setTreEm({ ...treEm, hoanCanh: e.target.value })}
                />
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                    <b style={{ fontSize: 20 }}>Học bổng</b>
                  </label>

                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      setIsEdit(false);
                      handleClickOpenDialogHocBong();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                </div>
                {hocBong.length > 0 &&
                  hocBong.map((hocbong, index) => {
                    return (
                      <Card
                        fullWidth
                        onDoubleClick={() => {
                          setSelectedHocBongIndex(index);
                          setIsEdit(true);
                          setInfoHocBong(hocbong);
                          handleClickOpenDialogHocBong();
                        }}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          marginBottom: 2,
                          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={hocbong.donViBaoTro.logo}
                            alt="Logo Đơn vị bảo trợ"
                            style={{
                              marginLeft: 20,
                              width: 80,
                              borderRadius: '15%',
                              height: 80,
                            }}
                          />
                          <div>
                            <h3 style={{ marginLeft: 20 }}>
                              {' '}
                              {hocbong.donViBaoTro.tenDonVi} - {hocbong.hocBong.tenHocBong}
                            </h3>
                            <p style={{ marginLeft: 40 }}>
                              Năm {hocbong.namNhan} - {hocbong.namHoanThanh}
                            </p>
                          </div>

                          <IconButton
                            className="button_remove_hoctap"
                            onClick={() => {
                              handleRemoveHocBong(index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </Card>
                    );
                  })}
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                    <b style={{ fontSize: 20 }}>Học tập</b>
                  </label>

                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      setIsEdit(false);
                      handleClickOpenDialogHocTap();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                </div>
                {hocTap.length > 0 &&
                  hocTap.map((hoctap, index) => {
                    return (
                      <Card
                        fullWidth
                        onDoubleClick={() => {
                          setSelectedHocTapIndex(index);
                          setIsEdit(true);
                          setInfoHocTap(hocTap[index]);
                          handleClickOpenDialogHocTap();
                        }}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          marginBottom: 2,
                          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <h3 style={{ marginLeft: 20 }}>
                            {hoctap.hocKy} - Năm {hoctap.namHoc}
                          </h3>
                          <IconButton
                            className="button_remove_hoctap"
                            onClick={() => {
                              handleRemoveHocTap(index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                        <p style={{ marginLeft: 40 }}>Học Lực: {hoctap.hocLuc}</p>
                      </Card>
                    );
                  })}
              </FormControl>
            </div>
            <DialogListDoiTuong
              openDialog={openDialogListDoiTuong}
              addDoiTuong={handleAddDoiTuong}
              handleClose={handleCloseDialogListDoiTuong}
            />
            <DialogHocBong
              openDialogCreate={openDialogHocBong}
              isEdit={isEdit}
              infoHocBong={infoHocBong}
              handleCickAdd={handleCickAddHocBong}
              handleCickEdit={handleCickEditHocBong}
              handleClose={handleCloseDialogHocBong}
            />
            <DialogHocTap
              openDialogCreate={openDialogHocTap}
              isEdit={isEdit}
              infoHocTap={infoHocTap}
              handleCickAdd={handleCickAddHocTap}
              handleCickEdit={handleCickEditHocTap}
              handleClose={handleCloseDialog}
            />
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
                Thêm trẻ em
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
