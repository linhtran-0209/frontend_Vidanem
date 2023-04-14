import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import Iconify from '../../../../components/iconify';

import 'react-datepicker/dist/react-datepicker.css';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';
import { DialogHocTap } from './DialogHocTap';

export default function EditChildren() {
  const { id } = useParams();
  const [quyen, setQuyen] = useState(0);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesEdit, setImagesEdit] = useState([]);
  const [imagesDelete, setImagesDelete] = useState([]);
  const [search, setSearch] = useState('');
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [SCHOLARSHIPLIST, setSCHOLARSHIPLIST] = useState([]);
  const [treEm, setTreEm] = useState({});
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hocTap, sethocTap] = useState([]);
  const [hocTapNew, sethocTapNew] = useState([]);

  const [openDialogHocTap, setOpenDialogHocTap] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [infoHocTap, setInfoHocTap] = useState({});
  const [selectedHocTapIndex, setSelectedHocTapIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setTreEm({ ...treEm, ngaySinh: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
  };

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/currentUser`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.quyen);
      setQuyen(data.quyen);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getChild = async () => {
    const url = `${process.env.REACT_APP_API_URL}/treem/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setTreEm(data.data);
    const momentDate = moment.utc(data.data.ngaySinh);
    const formattedDate = momentDate.format('DD/MM/YYYY');
    console.log(momentDate);
    console.log(moment());
    // setSelectedDate(formattedDate);
    // setSelectedDate(new Date());
    setSelectedSponsor(data.data.donViBaoTro[0]);
    getScholarshipList(data.data.donViBaoTro[0]);
    setSelectedScholarship(data.data.hocBong[0]);
    setPreview(data.data.hinhAnh);
    getHocTap(data.data._id);
  };

  useEffect(() => {
    getChild();
  }, []);

  const getSponsorList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSPONSERLIST(data.data);
  };

  useEffect(() => {
    getSponsorList();
  }, []);

  const getScholarshipList = async (donViBaoTro) => {
    const url = `${process.env.REACT_APP_API_URL}/scholarship/getAll?donViTaiTro=${donViBaoTro}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSCHOLARSHIPLIST(data.data);
  };

  const getHocTap = async (treem) => {
    const url = `${process.env.REACT_APP_API_URL}/hoctap/bytreem?treem=${treem}`;
    const { data } = await axios.get(url, { withCredentials: true });
    sethocTap(data.data);
  };

  const handleChangeSponsor = (e) => {
    setSelectedSponsor(e.target.value);
    setTreEm({ ...treEm, donViBaoTro: e.target.value });
    getScholarshipList(e.target.value);
  };

  const handleChangeScholarship = (e) => {
    setSelectedScholarship(e.target.value);
    setTreEm({ ...treEm, hocBong: e.target.value });
  };

  const handleRemoveImage = (index) => {
    if (preview.length - 1 === selectedImageIndex) setSelectedImageIndex(0);
    setImagesDelete([...preview, preview[index]]);
    setPreview((prev) => {
      const newPreview = [...prev];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview([...preview, { duongDan: URL.createObjectURL(file) }]);
      setImages([...images, file]);
    }
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];
    const previews = [...preview];
    previews[selectedImageIndex].duongDan = URL.createObjectURL(file);
    setPreview(previews);
    setImagesEdit([...imagesEdit, { id: previews[selectedImageIndex]._id, image: file }]);
    console.log({ id: previews[selectedImageIndex]._id, image: file });
  };

  const handleClickOpenDialog = () => {
    setOpenDialogHocTap(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogHocTap(false);
  };

  const handleCickAdd = (hoctap) => {
    console.log(hoctap);
    sethocTap([...hocTap, hoctap]);
    setTreEm([...treEm.hocTap, hocTap]);
  };

  const handleCickEdit = (hoctap) => {
    console.log(hoctap);
    const hoctaps = [...hocTap];
    hoctaps[selectedHocTapIndex] = hoctap;
    sethocTap(hoctaps);
    setTreEm(hoctaps);
  };

  const handleSubmit = async () => {
    console.log(treEm);
    console.log(hocTap);
    const urlHocTap = `${process.env.REACT_APP_API_URL}/hoctap/insert`;
    const url = `${process.env.REACT_APP_API_URL}/treem/insert`;

    const formData = new FormData();
    formData.append('hoTen', treEm.hoTen);
    formData.append('ngaySinh', treEm.ngaySinh);
    formData.append('truong', treEm.truong);
    formData.append('SDT', treEm.SDT);
    formData.append('diaChi', treEm.diaChi);
    formData.append('hoanCanh', treEm.hoanCanh);
    formData.append('donViBaoTro', treEm.donViBaoTro);
    formData.append('hocBonng', treEm.hocBong);
    formData.append('namNhan', treEm.namNhan);
    formData.append('namHoanThanh', treEm.namHoanThanh);

    console.log(images);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const result = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(result);
    // .then((res) => {
    //   if (res.status === 200) {
    //     setOpenSuccessMessage(res.data.message);
    //     setIdTreEm(res.data.id);
    //   } else setOpenErrMessage(res.data.message);
    // });

    if (result.status === 200) {
      // .then((data) => {
      //   // console.log(data.data.message);
      //   setOpenSuccessMessage(data.data.message);
      // });
      setOpenSuccessMessage(result.data.message);
    } else setOpenErrMessage(result.data.message);
    if (result.data.id) {
      await axios.post(
        urlHocTap,
        {
          treEm: result.data.id,
          hocTaps: hocTap,
        },
        { withCredentials: true }
      );
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview.length > 0 && (
              <img
                src={preview[selectedImageIndex].duongDan}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  objectFit: 'cover',
                  height: 200,
                  border: '2px solid Silver',
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
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={image.duongDan}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            borderRadius: '5%',
                            objectFit: 'cover',
                            height: 60,
                            border: '2px solid Silver',
                          }}
                        />
                      </div>
                      <input
                        accept="image/*"
                        id="image-edit"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          handleEditFileUpload(e);
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                      >
                        <label
                          htmlFor="image-edit"
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <button
                            onClick={(e) => {
                              // e.stopPropagation();
                              document.getElementById('image-edit').click();
                            }}
                          >
                            <Iconify style={{ color: 'green', width: '15' }} icon={'eva:edit-2-outline'} />
                          </button>
                        </label>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                        >
                          <Iconify style={{ color: 'red', width: '15' }} icon={'eva:trash-2-outline'} />
                        </button>
                      </div>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
          {preview.length < 4 && (
            <>
              <input
                accept="image/*"
                id="image-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <label
                htmlFor="image-input"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
              >
                <Button variant="contained" color="primary" component="span">
                  Thêm ảnh
                </Button>
              </label>
            </>
          )}

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
                value={treEm.hoTen || ''}
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
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <TextField
                id="hoanCanh"
                label="Địa chỉ *"
                value={treEm.diaChi || ''}
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
                value={treEm.SDT || ''}
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
                value={treEm.truong || ''}
                onChange={(e) => setTreEm({ ...treEm, truong: e.target.value })}
                label="Trường *"
                type="text"
                fullWidth
              />
            </FormControl>
          </div>

          <div className="container__hoctap">
            <FormControl className="formcontrol__inform" variant="outlined" fullWidth>
              <div>
                <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
                <Select
                  onChange={handleChangeSponsor}
                  label="Đơn vị tài trợ"
                  value={selectedSponsor}
                  fullWidth
                  margin="dense"
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

                  {[{ _id: 'none', tenDonVi: 'Chọn khoa' }, ...SPONSERLIST]
                    .filter((option) => option.tenDonVi.toLowerCase().includes(search))
                    .map((option) => (
                      <MenuItem key={option._id} value={option._id} label={option.tenDonVi}>
                        {option.tenDonVi}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </FormControl>
            <FormControl className="formcontrol__inform" variant="outlined" fullWidth>
              <div>
                <InputLabel id="demo-simple-select-standard-label">Học bổng</InputLabel>
                <Select
                  onChange={handleChangeScholarship}
                  label="Học bổng"
                  value={selectedScholarship}
                  fullWidth
                  margin="dense"
                >
                  {/* {SCHOLARSHIPLIST.filter((option) => option.tenHocBong.toLowerCase().includes(search)).map((option) => ( */}
                  {SCHOLARSHIPLIST.map((option) => (
                    <MenuItem key={option._id} value={option._id} label={option.tenHocBong}>
                      {option.tenHocBong}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
          </div>
          <div className="container__donvi">
            <FormControl className="formcontrol__inform" variant="standard" fullWidth>
              <TextField
                htmlFor="demo-customized-textbox"
                margin="dense"
                id="donViBaoTro"
                value={treEm.namNhan || ''}
                label="Năm nhận *"
                onChange={(e) => setTreEm({ ...treEm, namNhan: e.target.value })}
                type="number"
                fullWidth
              />
            </FormControl>
            <FormControl className="formcontrol__inform" variant="standard" fullWidth>
              <TextField
                htmlFor="demo-customized-textbox"
                margin="dense"
                id="loaiBaoTro"
                label="Năm hoàn thành *"
                value={treEm.namHoanThanh || ''}
                onChange={(e) => setTreEm({ ...treEm, namHoanThanh: e.target.value })}
                type="number"
                fullWidth
              />
            </FormControl>
          </div>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <textarea
                id="hoanCanh"
                label="Hoàn Cảnh *"
                type="text"
                placeholder="Hoàn cảnh"
                value={treEm.hoanCanh || ''}
                onChange={(e) => setTreEm({ ...treEm, hoanCanh: e.target.value })}
              />
            </FormControl>
          </div>
          <div className="container__hoancanh">
            <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
              <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                <b style={{ fontSize: 20 }}>Học tập</b>
                <Button
                  style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                  onClick={() => {
                    setIsEdit(false);
                    handleClickOpenDialog();
                  }}
                >
                  <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                </Button>
              </label>

              {hocTap.length > 0 &&
                hocTap.map((hoctap, index) => {
                  return (
                    <Card
                      onDoubleClick={() => {
                        // console.log(index, hocTap[index]);
                        setSelectedHocTapIndex(index);
                        setIsEdit(true);
                        setInfoHocTap(hocTap[index]);
                        handleClickOpenDialog();
                      }}
                      variant="outlined"
                      orientation="horizontal"
                      sx={{
                        marginBottom: 2,
                        width: '95%',
                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                      }}
                    >
                      <h3 style={{ marginLeft: 20 }}>
                        {hoctap.hocKy} - Năm {hoctap.namHoc}
                      </h3>
                      <p style={{ marginLeft: 40 }}>Học Lực: {hoctap.hocLuc}</p>
                    </Card>
                  );
                })}
            </FormControl>
          </div>
          <DialogHocTap
            openDialogCreate={openDialogHocTap}
            isEdit={isEdit}
            infoHocTap={infoHocTap}
            handleCickAdd={handleCickAdd}
            handleCickEdit={handleCickEdit}
            handleClose={handleCloseDialog}
          />
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            {quyen === 3 ? (
              <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
                Cập nhật
              </LoadingButton>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoadingButton style={{marginRight:20, background: 'red'}} type="submit" variant="contained" onClick={handleSubmit}>
                  Trả Về
                </LoadingButton>
                <LoadingButton style={{marginRight:20, background: 'green'}} type="submit" variant="contained" onClick={handleSubmit}>
                  Duyệt
                </LoadingButton>
              </div>
            )}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
