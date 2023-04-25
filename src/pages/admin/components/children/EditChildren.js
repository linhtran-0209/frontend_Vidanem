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
  IconButton,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../../components/iconify';
import 'react-datepicker/dist/react-datepicker.css';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';
import { DialogHocTap } from './DialogHocTap';
import { DialogListHocTap } from './DialogListHocTap';
import { DialogReasonReject } from './DialogReasonReject';

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
  const [hocTap, setHocTap] = useState([]);
  const [hocTapNew, sethocTapNew] = useState([]);
  const [hocTapEdit, setHocTapEdit] = useState([]);
  const [hocTapDelete, setHocTapDelete] = useState([]);

  const [openDialogHocTap, setOpenDialogHocTap] = useState(false);
  const [openDialogList, setOpenDialogList] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [infoHocTap, setInfoHocTap] = useState({});
  const [selectedHocTapIndex, setSelectedHocTapIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());

  const [openDialogReasonReject, setOpenDialogReasonReject] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

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
    setSelectedDate(moment(data.data.ngaySinh));
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
    setHocTap(data.data);
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
    const indexImg = images.findIndex((image) => image._id === preview[index]._id);
    if (indexImg !== -1) {
      setImages((img) => {
        const newImg = [...img];
        newImg.splice(indexImg, 1);
        return newImg;
      });
    }
    const indexEdit = imagesEdit.findIndex((image) => image._id === preview[index]._id);
    if (indexEdit !== -1) {
      setImagesEdit((img) => {
        const newImg = [...img];
        newImg.splice(indexEdit, 1);
        return newImg;
      });
    }

    setImagesDelete([...imagesDelete, preview[index]]);
    setPreview((prev) => {
      const newPreview = [...prev];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newId = uuidv4();
      setPreview([...preview, { _id: `temp${newId}`, url: URL.createObjectURL(file) }]);
      setImages([...images, { _id: `temp${newId}`, image: file }]);
    }
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];
    const previews = [...preview];
    previews[selectedImageIndex].url = URL.createObjectURL(file);
    setPreview(previews);

    const index = images.findIndex((image) => image._id === previews[selectedImageIndex]._id);
    setImages((img) => {
      const newImg = [...img];
      newImg.splice(index, 1);
      return newImg;
    });

    const indexEdit = imagesEdit.findIndex((image) => image._id === previews[selectedImageIndex]._id);
    if (indexEdit !== -1) {
      // Phần tử có id đã tồn tại trong mảng
      // Chỉ mục của phần tử đó là index
      const imagesEdits = [...imagesEdit];
      imagesEdits[indexEdit].image = file;
      setImagesEdit(imagesEdits);
    } else {
      // Phần tử không tồn tại trong mảng
      setImagesEdit([...imagesEdit, { _id: previews[selectedImageIndex]._id, image: file }]);
    }
    console.log({ id: previews[selectedImageIndex]._id, image: file });
  };

  const handleClickOpenDialog = () => {
    setOpenDialogHocTap(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogHocTap(false);
  };

  const handleClickOpenDialogList = () => {
    setOpenDialogList(true);
  };
  const handleCloseDialogList = () => {
    setOpenDialogList(false);
  };

  const handleCickAdd = (hoctap) => {
    console.log(hoctap);
    const newId = uuidv4();
    setHocTap([{ ...hoctap, _id: `temp${newId}` }, ...hocTap]);
    sethocTapNew([...hocTapNew, { ...hoctap, _id: `temp${newId}` }]);
  };

  const handleRemoveHocTap = (index) => {
    const indexHocTapNew = hocTapNew.findIndex((hoctap) => hoctap._id === hocTap[index]._id);
    if (indexHocTapNew !== -1) {
      sethocTapNew((hoctap) => {
        const newHocTap = [...hoctap];
        newHocTap.splice(indexHocTapNew, 1);
        return newHocTap;
      });
    }

    console.log(hocTapEdit);
    const indexHocTapEdit = hocTapEdit.findIndex((hoctap) => hoctap._id === hocTap[index]._id);
    if (indexHocTapEdit !== -1) {
      setHocTapEdit((hoctap) => {
        const editHocTap = [...hoctap];
        editHocTap.splice(indexHocTapEdit, 1);
        return editHocTap;
      });
    }

    setHocTapDelete([...hocTapDelete, hocTap[index]]);
    setHocTap((hoctap) => {
      const newHocTaps = [...hoctap];
      newHocTaps.splice(index, 1);
      return newHocTaps;
    });
  };

  const handleCickEditHocTap = (hoctap) => {
    console.log(hoctap);
    const hoctaps = [...hocTap];
    hoctaps[selectedHocTapIndex] = hoctap;
    setHocTap(hoctaps);

    const indexHocTapNew = hocTapNew.findIndex((hoctap) => hoctap._id === hoctaps[selectedHocTapIndex]._id);
    if (indexHocTapNew !== -1) {
      sethocTapNew((hoctap) => {
        const newHocTap = [...hoctap];
        newHocTap.splice(indexHocTapNew, 1);
        return newHocTap;
      });
    }

    const indexEdit = hocTapEdit.findIndex((hoctap) => hoctap._id === hoctaps[selectedHocTapIndex]._id);
    if (indexEdit !== -1) {
      // Phần tử có id đã tồn tại trong mảng
      // Chỉ mục của phần tử đó là index
      const hoctapEdits = [...hocTapEdit];
      hoctapEdits[indexEdit] = hoctap;
      setHocTapEdit(hoctapEdits);
    } else {
      // Phần tử không tồn tại trong mảng
      setHocTapEdit([...hocTapEdit, hoctap]);
    }
  };

  const handleSubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL}/treem/update`;

    if (treEm.authStatus === 'DeXuat' || treEm.authStatus === 'TuChoi') {
      await axios
        .post(
          url,
          {
            id: treEm._id,
            hoTen: treEm.hoTen,
            ngaySinh: treEm.ngaySinh,
            diaChi: treEm.diaChi,
            SDT: treEm.SDT,
            truong: treEm.truong,
            donViBaoTro: treEm.donViBaoTro,
            hocBong: treEm.hocBong,
            namNhan: treEm.namNhan,
            namHoanThanh: treEm.namHoanThanh,
            hoanCanh: treEm.hoanCanh,
          },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.status === 200) {
            setOpenSuccessMessage(result.data.message);
          } else setOpenErrMessage(result.data.message);
        });
    }

    // Lưu hình ảnh
    if (images.length > 0) {
      images.forEach(async (image) => {
        const urlHinhAnh = `${process.env.REACT_APP_API_URL}/hinhanh/insert`;
        const formData = new FormData();
        formData.append('image', image.image);
        formData.append('refId', treEm._id);
        await axios.post(urlHinhAnh, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      });
    }
    console.log(imagesEdit.length);
    if (imagesEdit.length > 0) {
      console.log(1);
      imagesEdit.forEach(async (image) => {
        console.log(2);
        if (image._id.includes('temp')) {
          console.log(3);
          const urlHinhAnh = `${process.env.REACT_APP_API_URL}/hinhanh/insert`;
          const formData = new FormData();
          formData.append('image', image.image);
          formData.append('refId', treEm._id);
          await axios.post(urlHinhAnh, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        } else {
          console.log(image.image);
          const urlHinhAnh = `${process.env.REACT_APP_API_URL}/hinhanh/update`;
          const formData = new FormData();
          formData.append('image', image.image);
          formData.append('id', image._id);
          await axios.put(urlHinhAnh, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        }
      });
    }

    if (imagesDelete.length > 0) {
      imagesDelete.forEach(async (image) => {
        if (!image._id.includes('temp')) {
          const urlHinhAnh = `${process.env.REACT_APP_API_URL}/hinhanh/delete?id=${image._id}`;
          const formData = new FormData();
          formData.append('image', image.image);
          await axios.put(urlHinhAnh, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        }
      });
    }

    // Lưu thành tích học tập
    if (hocTapNew.length > 0) {
      const urlHocTap = `${process.env.REACT_APP_API_URL}/hoctap/insert`;
      await axios.post(
        urlHocTap,
        {
          treEm: treEm._id,
          hocTaps: hocTapNew,
        },
        { withCredentials: true }
      );
    }

    if (hocTapEdit.length > 0) {
      hocTapEdit.forEach(async (hoctap) => {
        if (hoctap._id.includes('temp')) {
          const urlHocTap = `${process.env.REACT_APP_API_URL}/hoctap/insert`;
          await axios.post(
            urlHocTap,
            {
              treEm: treEm._id,
              hocTaps: [hoctap],
            },
            { withCredentials: true }
          );
        } else {
          const urlHocTap = `${process.env.REACT_APP_API_URL}/hoctap/update`;
          await axios.put(
            urlHocTap,
            {
              id: hoctap._id,
              namHoc: hoctap.namHoc,
              hocKy: hoctap.hocKy,
              hocLuc: hoctap.hocLuc,
              thanhTich: hoctap.thanhTich,
            },
            { withCredentials: true }
          );
        }
      });
    }

    if (hocTapDelete.length > 0) {
      hocTapDelete.forEach(async (hoctap) => {
        if (!hoctap._id.includes('temp')) {
          const urlHocTap = `${process.env.REACT_APP_API_URL}/hoctap/delete`;
          await axios.post(
            urlHocTap,
            {
              id: hoctap._id,
            },
            { withCredentials: true }
          );
        }
      });
    }
  };

  const handleCloseDialogReason = () => {
    setOpenDialogReasonReject(false);
  };

  const handleReject = async (reason) => {
    const url = `${process.env.REACT_APP_API_URL}/treem/reject`;
    await axios.put(
      url,
      {
        id: treEm._id,
        reasonReject: reason,
      },
      { withCredentials: true }
    );
  };

  const handleAccept = async () => {
    if (quyen === 2) {
      const url = `${process.env.REACT_APP_API_URL}/treem/approveLv2`;
      await axios.put(
        url,
        {
          id: treEm._id,
        },
        { withCredentials: true }
      );
    } else if (quyen === 1) {
      const url = `${process.env.REACT_APP_API_URL}/treem/approveLv1`;
      await axios.put(
        url,
        {
          id: treEm._id,
        },
        { withCredentials: true }
      );
    } else alert('Không thể thực hiện chức năng này');
  };

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 200 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            {treEm.authStatus === 'TuChoi' && <p style={{ marginTop: -50, marginBottom: 60, color: 'red', fontSize: 20 }}>❌ Từ chối</p>}
            {treEm.authStatus === 'ChoDuyet' && <p style={{ marginTop: -50, marginBottom: 60, color: 'yellow', fontSize: 20 }}>⌛ Chờ Duyệt</p>}
            {treEm.authStatus === 'DaDuyet' && <p style={{ marginTop: -50, marginBottom: 60, color: 'green', fontSize: 20 }}>✔ Đã Duyệt</p>}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {preview.length > 0 && (
                <img
                  src={preview[selectedImageIndex].url}
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
                            src={image.url}
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
            {treEm.authStatus === 'TuChoi' && (
              <>
                <p style={{ backgroundColor: '#FF6A6A', color: 'white', paddingLeft: 40, fontSize: 20 }}>
                  <b>
                    {' '}
                    <u>Lí do từ chối:</u>{' '}
                  </b>{' '}
                  {treEm.reasonReject}
                </p>
              </>
            )}
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
                    // renderInput={(params) => <TextField {...params} />}
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

                    {[{ _id: 'none', tenDonVi: 'Chọn đơn vị' }, ...SPONSERLIST]
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
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label>
                    <b style={{ fontSize: 20 }}>Học tập</b>
                  </label>
                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      setIsEdit(false);
                      handleClickOpenDialog();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                </div>
                {hocTap.length > 0 &&
                  hocTap.slice(0, 2).map((hoctap, index) => {
                    return (
                      <Card
                        fullWidth
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
                              setSelectedHocTapIndex(index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                        <p style={{ marginLeft: 40 }}>Học Lực: {hoctap.hocLuc}</p>
                      </Card>
                    );
                  })}
                <div style={{ textAlign: 'center' }}>
                  <button className="button_show_more" onClick={handleClickOpenDialogList}>
                    Xem tất cả
                  </button>
                </div>
              </FormControl>
            </div>
            <DialogHocTap
              openDialogCreate={openDialogHocTap}
              isEdit={isEdit}
              infoHocTap={infoHocTap}
              handleCickAdd={handleCickAdd}
              handleCickEdit={handleCickEditHocTap}
              handleClose={handleCloseDialog}
            />
            <DialogListHocTap
              openDialog={openDialogList}
              listHocTap={hocTap}
              handleRemove={handleRemoveHocTap}
              handleCickAdd={handleCickAdd}
              handleCickEdit={handleCickEditHocTap}
              handleClose={handleCloseDialogList}
            />
            <DialogReasonReject
              openDialog={openDialogReasonReject}
              listHocTap={hocTap}
              handleReject={handleReject}
              handleClose={handleCloseDialogReason}
            />
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {quyen === 3 ? (
                <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
                  Cập nhật
                </LoadingButton>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {(treEm.authStatus === 'DeXuat' || (treEm.authStatus === 'ChoDuyet' && quyen === 1)) && (
                    <>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'red' }}
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                          setOpenDialogReasonReject(true);
                        }}
                      >
                        Trả Về
                      </LoadingButton>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'green' }}
                        type="submit"
                        variant="contained"
                        onClick={handleAccept}
                      >
                        Duyệt
                      </LoadingButton>
                    </>
                  )}
                </div>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
