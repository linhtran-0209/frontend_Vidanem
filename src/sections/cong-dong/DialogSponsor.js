import axios from 'axios';

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
import React, { useEffect, useState } from 'react';

export function DialogSponsor(props) {
  const [SPONSER, setSPONSER] = useState({});
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
      <Dialog className="dialogtreem" open={props.openDialog} onClose={props.handleClose} style={{zIndex:20000}}>
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
                    <div style={{marginTop: '40px', textAlign: 'justify'}}>
                      <p>{props.sponsor?.gioiThieu}</p>
                      <p><b>Địa chỉ: </b> {props.sponsor?.diaChi}</p>
                      <p><b>Số điện thoại: </b> {props.sponsor?.SDT}</p>
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
                      <Grid item xs={6}>
                        <Card
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            border: '1px solid gray',
                            backgroundColor: '#CAE1FF',
                          }}
                        >
                          <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                            <Tooltip title={hocbong.tenHocBong} placement="top">
                              <Typography variant="subtitle2" noWrap>
                                {hocbong.tenHocBong}
                              </Typography>
                            </Tooltip>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                Số lượng: {hocbong.soLuong}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                Giá trị mỗi suất: {hocbong.soTien}
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
