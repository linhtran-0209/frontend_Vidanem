import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  IconButton,
  Typography,
  Tab,
  Tooltip,
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';

export function EditModal(props) {
  const [SPONSER, setSPONSER] = useState({});
  const [hocBongs, setHocBongs] = useState([]);
  const [preview, setPreview] = useState(null);
  const [childrenList, setChildrenList] = useState([]);

  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [indexShowMore, setIndexShowMore] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [textFieldMaDonViError, setTextFieldMaDonViError] = useState(false);
  const [textFieldTenDonViError, setTextFieldTenDonViError] = useState(false);
  const [textFieldSDTError, setTextFieldSDTError] = useState(false);
  const [textFieldDiaChiError, setTextFieldDiaChiError] = useState(false);
  const [textFieldGioiThieuError, setTextFieldGioiThieuError] = useState(false);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    if (props.row._id) {
      getSponser();
    }
  }, [props.row]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageError(false);
      setPreview(URL.createObjectURL(file));
      setSPONSER({ ...SPONSER, logo: file });
    }
  };

  const getSponser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/byId?id=${props.row._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setSPONSER(data.data);
      setPreview(data.data.logo);
      getHocBong(data.data._id);
      getChildrenByDonVi(data.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getHocBong = async (idDonVi) => {
    const url = `${process.env.REACT_APP_API_URL}/scholarship/getAll?donViBaoTro=${idDonVi}&all=true`;
    const { data } = await axios.get(url, { withCredentials: true });
    setHocBongs(data.data);
  };

  const getChildrenByDonVi = async (idDonVi) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?don_vi_tai_tro=${idDonVi}&all=true`;
      const { data } = await axios.get(url, { withCredentials: true });

      setChildrenList(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = async () => {
    if (!SPONSER.logo) {
      setImageError(true);
    } else setImageError(false);
    if (!SPONSER.maDonVi) {
      setTextFieldMaDonViError(true);
    } else setTextFieldMaDonViError(false);
    if (!SPONSER.tenDonVi) {
      setTextFieldTenDonViError(true);
    } else setTextFieldTenDonViError(false);
    if (!SPONSER.diaChi) {
      setTextFieldDiaChiError(true);
    } else setTextFieldDiaChiError(false);
    if (!SPONSER.SDT) {
      setTextFieldSDTError(true);
    } else setTextFieldSDTError(false);
    if (!SPONSER.gioiThieu) {
      setTextFieldGioiThieuError(true);
    } else setTextFieldGioiThieuError(false);

    if (SPONSER.logo && SPONSER.maDonVi && SPONSER.tenDonVi && SPONSER.diaChi && SPONSER.SDT && SPONSER.gioiThieu) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/update?id=${props.row._id}`;

        const formData = new FormData();
        formData.append('image', SPONSER.logo);
        formData.append('maDonVi', SPONSER.maDonVi);
        formData.append('tenDonVi', SPONSER.tenDonVi);
        formData.append('diaChi', SPONSER.diaChi);
        formData.append('SDT', SPONSER.SDT);
        formData.append('gioiThieu', SPONSER.gioiThieu);
        axios
          .put(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              setOpenSuccessMessage(res.data.message);
            } else setOpenErrMessage(res.data.message);
          });
        props.handleClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClose = () => {
    setImageError(false);
    setTextFieldMaDonViError(false);
    setTextFieldTenDonViError(false);
    setTextFieldSDTError(false);
    setTextFieldGioiThieuError(false);
    props.handleClose();
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);
  return (
    <>
      {/* <Dialog open={props.setOpenDialogEdit} onClose={props.handleClose}> */}
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
      <Dialog className="dialogupdatesponsor" open={props.setOpenDialogEdit} onClose={props.handleClose}>
        <div className="titleupdatesponsor">
          {' '}
          Đơn vị bảo trợ
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                <Tab label="Thông tin" value="1" />
                <Tab label="Học bổng" value="2" />
                <Tab label="Trẻ em" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{ height: '500px', width: '100%' }}>
              <div className="dialog-container">
                <div className="content-container">
                  <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            borderRadius: '30%',
                            objectFit: 'cover',
                            height: 200,
                          }}
                        />
                      )}
                    </div>
                    <input
                      accept="image/*"
                      id="image-input"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    {imageError && (
                      <Typography component="span" variant="body2" style={{ textAlign: 'center', color: 'red' }}>
                        <p>Vui lòng chọn logo ảnh cho đơn vị bảo trợ</p>
                      </Typography>
                    )}
                    <label
                      htmlFor="image-input"
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
                    >
                      <Button variant="contained" color="primary" component="span">
                        Chọn Logo
                      </Button>
                    </label>

                    <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        label="Mã đơn vị"
                        onChange={(e) => {
                          setTextFieldMaDonViError(false);
                          setSPONSER({ ...SPONSER, maDonVi: e.target.value });
                        }}
                        value={SPONSER.maDonVi || ''}
                        type="text"
                        fullWidth
                        error={textFieldMaDonViError}
                        helperText={textFieldMaDonViError && 'Vui lòng nhập mã đơn vị'}
                      />
                    </FormControl>
                    <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        label="Tên đơn vị tài trợ"
                        onChange={(e) => {
                          setTextFieldTenDonViError(false);
                          setSPONSER({ ...SPONSER, tenDonVi: e.target.value });
                        }}
                        value={SPONSER.tenDonVi || ''}
                        type="text"
                        fullWidth
                        error={textFieldTenDonViError}
                        helperText={textFieldTenDonViError && 'Vui lòng nhập tên đơn vị'}
                      />
                    </FormControl>
                    <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        label="Số điện thoại"
                        onChange={(e) => {
                          setTextFieldSDTError(false);
                          setSPONSER({ ...SPONSER, SDT: e.target.value });
                        }}
                        value={SPONSER.SDT || ''}
                        type="phone"
                        fullWidth
                        error={textFieldSDTError}
                        helperText={textFieldSDTError && 'Vui lòng nhập số điện thoại'}
                      />
                    </FormControl>
                    <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        label="Địa chỉ"
                        onChange={(e) => {
                          setTextFieldDiaChiError(false);
                          setSPONSER({ ...SPONSER, diaChi: e.target.value });
                        }}
                        value={SPONSER.diaChi || ''}
                        type="phone"
                        fullWidth
                        error={textFieldDiaChiError}
                        helperText={textFieldDiaChiError && 'Vui lòng nhập địa chỉ'}
                      />
                    </FormControl>
                    <FormControl className="formcontrolupdatesponsor" variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        label="Giới thiệu"
                        onChange={(e) => {
                          setTextFieldGioiThieuError(false);
                          setSPONSER({ ...SPONSER, gioiThieu: e.target.value });
                        }}
                        value={SPONSER.gioiThieu || ''}
                        type="text"
                        fullWidth
                        error={textFieldGioiThieuError}
                        helperText={textFieldGioiThieuError && 'Vui lòng nhập đoạn giới thiệu ngắn về đơn vị'}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button className="huycapnhatnhataitro" onClick={handleClose}>
                      Hủy
                    </Button>
                    <Button className="capnhatnhataitro" onClick={handleSubmit}>
                      Cập nhật
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" style={{ height: '500px', width: '100%' }}>
              <div className="dialog-container">
                <div className="content-container">
                  <Grid container spacing={1}>
                    {hocBongs.length === 0 && (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '300px',
                        }}
                      >
                        <p style={{ marginLeft: 'auto', marginRight: 'auto', color: 'gray' }}>
                          Không có thông tin học bổng
                        </p>
                      </div>
                    )}
                    {hocBongs.map((hocbong, index) => (
                      <Grid item xs={12}>
                        <ScholarshipItem hocBong={hocbong} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3" style={{ height: '500px', width: '100%' }}>
              <div className="dialog-container">
                <div className="content-container">
                  <Grid container spacing={1}>
                    {childrenList?.length === 0 && (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '300px',
                        }}
                      >
                        <p style={{ marginLeft: 'auto', marginRight: 'auto', color: 'gray' }}>
                          Không có thông tin trẻ em
                        </p>
                      </div>
                    )}
                    {childrenList?.map((child) => (
                      <Grid key={child._id} item xs={6}>
                        <Card
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            border: '1px solid #99FFFF',
                            '&:hover': {
                              border: '1px solid black',
                            },
                          }}
                        >
                          <Grid item xs={3}>
                            <img src={child.hinhAnh[0].url} alt="" style={{ width: 80, height: 80, margin: 'auto' }} />
                          </Grid>
                          <Grid item xs={9}>
                            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1, color: '#1E90FF' }}>
                              <Typography variant="subtitle2" noWrap>
                                {child.hoTen}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  <b>Đối tượng:</b>{' '}
                                  {child.doiTuong.map((doituong, index) =>
                                    index === child.doiTuong.length - 1 ? doituong.ten : `${doituong.ten}, `
                                  )}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  <b>Hoàn cảnh:</b> {child.hoanCanh}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Dialog>
    </>
  );
}

ScholarshipItem.propTypes = {
  item: PropTypes.object,
  curentTitle: PropTypes.string,
  handleTitle: PropTypes.func,
};

function ScholarshipItem({ hocBong }) {
  const [openShowMore, setOpenShowMore] = useState(false);
  const [children, setChildren] = useState([]);

  const [showMoreHeight, setShowMoreHeight] = useState(null);
  const showMoreContentRef = useRef(null);

  useEffect(() => {
    if (openShowMore) {
      const contentElement = showMoreContentRef.current;
      const contentHeight = contentElement.scrollHeight;
  
      setShowMoreHeight(contentHeight);
    } else {
      setShowMoreHeight(null);
    }
  }, [openShowMore]);

  const showMoreAnimation = useSpring({ height: showMoreHeight !== null ? showMoreHeight : 0 });

  const handleShowMore = () => {
    setOpenShowMore(!openShowMore);
    if (!openShowMore) {
      getChildren(hocBong._id);
    }
  };

  const getChildren = async (idHocBong) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoc_bong=${idHocBong}&all=true`;
      const { data } = await axios.get(url, { withCredentials: true });

      setChildren(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card
      onClick={handleShowMore}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        border: '1px solid gray',
        backgroundColor: '#CAE1FF',
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Tooltip title={hocBong.tenHocBong} placement="top">
          <Typography variant="subtitle2" noWrap>
            {hocBong.tenHocBong}
          </Typography>
        </Tooltip>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: 'auto' }} noWrap>
              <b>Giá trị mỗi suất: </b> {hocBong.soTien.toLocaleString()} VND
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary', margin: 'auto' }} noWrap>
              <b> Số lượng: </b> {hocBong.soLuong} em
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            <b> Hình thức trao tặng </b> {hocBong.hinhThuc}
          </Typography>
        </Box>
        <animated.div style={showMoreAnimation}>
          <div ref={showMoreContentRef}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {openShowMore && (
                  <>
                    <b style={{ fontSize: '18px', marginTop: '10px' }}> Danh sách trẻ em nhận học bổng </b>
                    {children.length === 0 && (
                      <p style={{ marginLeft: 'auto', marginRight: 'auto', color: 'gray' }}>
                        Không có thông tin trẻ em nhận học bổng này
                      </p>
                    )}
                    {children.map((child) => (
                      <Grid key={child._id} item xs={12}>
                        <Card
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            margin: 1,
                            border: '1px solid #9C9C9C',
                            backgroundColor: '#CAE1FF',
                            '&:hover': {
                              border: '1px solid black',
                            },
                          }}
                        >
                          <Grid item xs={3}>
                            <img
                              src={child.hinhAnh[0].url}
                              alt=""
                              style={{ width: 100, height: 100, margin: 'auto' }}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1, color: '#1E90FF' }}>
                              <Typography variant="subtitle2" noWrap>
                                {child.hoTen}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  <b>Ngày sinh:</b> {moment(child.ngaySinh).format('DD/MM/YYYY')}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  <b>SĐT:</b> {child.SDT}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  <b>Địa chỉ:</b> {child.diaChi}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </>
                )}
              </Typography>
            </Box>
          </div>
        </animated.div>
      </Box>
    </Card>
  );
}
