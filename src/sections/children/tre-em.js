import axios from 'axios';
import { Box, Dialog, Grid, Card, Tab, Typography, Tooltip, Pagination } from '@mui/material';
import parse from 'html-react-parser';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import TreEmToolbar from './TreEmToolbar';
import { TreEmDialog } from '../home/dialog/tre-em-dialog';

export default function TreEm() {
  const [filterName, setFilterName] = useState('');
  const [doiTuong, setDoiTuong] = useState('');
  const [quan, setQuan] = useState('');
  const [phuong, setPhuong] = useState('');
  const [openWards, setOpenWards] = useState([]);
  const [sponsor, setSponsor] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [childrenList, setChildrenList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterNamNhan, setFilterNamNhan] = useState('');
  const [selectedTreEm, setSelectedTreEm] = useState();
  const [openDialogTreEm, setOpenDialogTreEm] = useState(false);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/treem/getAll`;
        const { data } = await axios.get(url, { withCredentials: true });
        // const  parse=data.data.email;

        setChildrenList(data.data);

        setTotal(data.total);
      } catch (err) {
        console.log(err);
      }
    };

    getChildren();
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangeDoiTuong = async (event) => {
    setDoiTuong(event.target.value);
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${event.target.value}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeQuan = async (event) => {
    setQuan(event.target.value);
    if (event.target.value) {
      try {
        const url = `https://provinces.open-api.vn/api/d/${event.target.value}?depth=2`;
        const { data } = await axios.get(url);
        setOpenWards(data.wards);
      } catch (err) {
        console.log(err);
      }
    } else setPhuong('');
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${event.target.value}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePhuong = async (event) => {
    setPhuong(event.target.value);
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${event.target.value}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSponsor = async (event) => {
    setSponsor(event.target.value);
    console.log(event.target.value);
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${event.target.value}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter' || !event.key) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

        const { data } = await axios.get(url, { withCredentials: true });

        setChildrenList(data.data);
        setTotal(data.total);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickDetailChildren = (id) => {
    setSelectedTreEm(id);
    setOpenDialogTreEm(true);
  };

  const handleCloseDialogTreEm = () => {
    setOpenDialogTreEm(false);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${newPage}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TreEmToolbar
          filterName={filterName}
          doiTuong={doiTuong}
          onFilterName={handleFilterByName}
          handleChangeDoiTuong={handleChangeDoiTuong}
          quan={quan}
          handleChangeQuan={handleChangeQuan}
          openWards={openWards}
          phuong={phuong}
          handleChangePhuong={handleChangePhuong}
          sponsor={sponsor}
          handleChangeSponsor={handleChangeSponsor}
          onClickSearch={handleSearch}
        />
      </div>
      <div style={{ margin: '20px 50px' }}>
        <Grid container spacing={3}>
          {childrenList?.map((child, index) => (
            <Grid key={child._id} item xs={4}>
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
                onClick={(e) => {
                  handleClickDetailChildren(child._id);
                }}
              >
                <Grid item xs={3}>
                  <img src={child.hinhAnh[0].url} alt="" style={{ width: 100, height: 100, margin: 'auto' }} />
                </Grid>
                <Grid item xs={9}>
                  <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1, color: '#1E90FF' }}>
                    <Typography variant="subtitle2" noWrap>
                      {child.hoTen} - {moment(child.ngaySinh).format('DD/MM/YYYY')}
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        <b>Đơn vị bảo trợ:</b>{' '}
                        {child.donViBaoTro.map((donvi, index) =>
                          index === child.donViBaoTro.length - 1 ? donvi.tenDonVi : `${donvi.tenDonVi}, `
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <TreEmDialog openDialog={openDialogTreEm} _id={selectedTreEm} handleClose={handleCloseDialogTreEm} />
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(total / rowsPerPage)} page={page + 1} onChange={handleChangePage} />
      </Box>
    </div>
  );
}
