import axios from 'axios';
import { Box, Dialog, Grid, Card, Tab, Typography, Tooltip } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { CommentList } from './CommentList';

export function TreEmDialog(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [treEm, setTreEm] = useState({ hoTen: '', ngaySinh: '', diaChi: '', SDT: '', truong: '', doiTuong: [] });
  const [images, setImages] = useState([]);
  const [hocTaps, setHocTaps] = useState([]);
  const [hocBongs, setHocBongs] = useState([]);
  const [comments, setComments] = useState([]);
  const [tab, setTab] = useState('1');

  useEffect(() => {
    const getTreEm = async () => {
      const url = `${process.env.REACT_APP_API_URL}/treem/byId?id=${props._id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setTreEm(data.data);
      setImages(data.data.hinhAnh);
      getHocTap(props._id);
      getHocBong(props._id);
      getBinhLuan(props._id);
    };
    const getHocTap = async (id) => {
      const url = `${process.env.REACT_APP_API_URL}/hoctap/bytreem?treem=${id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setHocTaps(data.data);
    };
    const getHocBong = async (id) => {
      const url = `${process.env.REACT_APP_API_URL}/hocbongtreem/bytreem?treem=${id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setHocBongs(data.data);
    };
    const getBinhLuan = async (id) => {
      const url = `${process.env.REACT_APP_API_URL}/binhluan/getAllByTreEm?treEm=${id}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setComments(data.data);
    };
    getTreEm();
  }, [props._id]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <Dialog className="dialogtreem" open={props.openDialog} onClose={props.handleClose} style={{ zIndex: 20000 }}>
        <div className="info-treem">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <div className="img-slider-treem">
                <Slider {...settings}>
                  {images.map((image) => (
                    <img src={image.url} alt="cover" />
                  ))}
                </Slider>
              </div>
            </Grid>

            <Grid item xs={6} sx={{ overflowY: 'auto', height: 500 }}>
              <div className="spaced">
                <p>
                  <b>Họ tên:</b> {treEm.hoTen}
                </p>
                <p>
                  <b>Ngày sinh:</b> {moment(treEm.ngaySinh).format('DD/MM/YYYY')}
                </p>
                <p>
                  <b>Địa chỉ:</b> {treEm.diaChi}
                </p>
                <p>
                  <b>Số điện thoại:</b> {treEm.SDT}
                </p>
                <p>
                  <b>Trường:</b> {treEm.truong}
                </p>
                <p>
                  <b>Đối tượng:</b>{' '}
                  {treEm.doiTuong.map((doituong, index) =>
                    index === treEm.doiTuong.length - 1 ? doituong.ten : `${doituong.ten}, `
                  )}
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="thanhtich">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                  <Tab label="Hoàn cảnh" value="1" />
                  <Tab label="Thành tích" value="2" />
                  <Tab label="Học bổng" value="3" />
                  <Tab label="Lời chúc" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ height: '250px' }}>
                <div className="dialog-container">
                  <div className="content-container">
                    {treEm.hoanCanh?.split('\n').map((item, index) => (
                      <React.Fragment key={index}>
                        {item}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2" style={{ height: '250px' }}>
                <div className="dialog-container">
                  <div className="content-container">
                    {hocTaps.map((hoctap, index) => (
                      <>
                        {hoctap.thanhTich && (
                          <div>
                            <p>
                              <b>
                                {hoctap.hocKy} - Năm học {hoctap.namHoc}
                              </b>
                            </p>
                            {hoctap.thanhTich.split('\n').map((item, index) => (
                              <React.Fragment key={index}>
                                <p style={{ marginLeft: '10px' }}>{item}</p>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3" style={{ height: '250px' }}>
                <div className="dialog-container">
                  <div className="content-container">
                    <Grid container spacing={1}>
                      {hocBongs.map((hocbong, index) => (
                        <Grid item xs={12}>
                          <Card sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid black' }}>
                            <img src={hocbong.donViBaoTro.logo} alt="" style={{ width: 60, height: 60 }} />
                            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                              <Tooltip title={hocbong.donViBaoTro.tenDonVi} placement="top">
                                <Typography variant="subtitle2" noWrap>
                                  {hocbong.donViBaoTro.tenDonVi}
                                </Typography>
                              </Tooltip>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={hocbong.hocBong.tenHocBong} placement="right">
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                    {hocbong.hocBong.tenHocBong}
                                  </Typography>
                                </Tooltip>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  Giá trị: {hocbong.hocBong.soTien} VND ({hocbong.hocBong.hinhThuc})
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                  {hocbong.namHoanThanh > moment().format('YYYY')
                                    ? `Còn lại: ${hocbong.namHoanThanh - moment().format('YYYY')} năm`
                                    : ''}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="4" style={{ height: '250px' }}>
                <div className="dialog-container">
                  <div className="content-container">
                    <CommentList treEm={treEm._id} comments={comments} />
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </Dialog>
    </>
  );
}
