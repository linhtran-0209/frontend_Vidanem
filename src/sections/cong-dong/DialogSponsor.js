import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Card, Dialog, DialogContent, Grid, IconButton, Typography, Tab, Tooltip } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import { TreEmDialog } from '../children/tre-em-dialog';

export function DialogSponsor(props) {
  const [hocBongs, setHocBongs] = useState([]);
  const [childrenList, setChildrenList] = useState([]);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    console.log(props.sponsor);
    if (props.sponsor) {
      getInfoSponser();
    }
  }, [props.sponsor]);

  const getInfoSponser = async () => {
    try {
      getHocBong(props.sponsor._id);
      getChildren(props.sponsor._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getHocBong = async (idDonVi) => {
    const url = `${process.env.REACT_APP_API_URL}/scholarship/getAll?donViBaoTro=${idDonVi}&all=true`;
    const { data } = await axios.get(url, { withCredentials: true });
    setHocBongs(data.data);
  };

  const getChildren = async (idDonVi) => {
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

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <>
      <Dialog className="dialogtreem" open={props.openDialog} onClose={props.handleClose} style={{ zIndex: 20000 }}>
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
                <Tab label="Thông tin chung" value="1" />
                <Tab label="Học bổng" value="2" />
                <Tab label="Trao tặng" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{ height: '500px', width: '100%' }}>
              <div className="dialog-container">
                <div className="content-container">
                  <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={props.sponsor?.logo}
                        alt="Preview"
                        style={{
                          width: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '40px', textAlign: 'justify' }}>
                      <p>{props.sponsor?.gioiThieu}</p>
                      <p>
                        <b>Địa chỉ: </b> {props.sponsor?.diaChi}
                      </p>
                      <p>
                        <b>Số điện thoại: </b> {props.sponsor?.SDT}
                      </p>
                    </div>
                  </DialogContent>
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
  const [openDialogTreEm, setOpenDialogTreEm] = useState(false);
  const [selectedTreEm, setSelectedTreEm] = useState();

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

  const handleClickDetailChildren = (id) => {
    setSelectedTreEm(id);
    setOpenDialogTreEm(true);
  };

  const handleCloseDialogTreEm = () => {
    setOpenDialogTreEm(false);
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
                          onClick={(e) => {
                            handleClickDetailChildren(child._id);
                          }}
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
      <TreEmDialog openDialog={openDialogTreEm} _id={selectedTreEm} handleClose={handleCloseDialogTreEm} />
    </Card>
  );
}
