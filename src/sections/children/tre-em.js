import axios from 'axios';
import { Box, Dialog, Grid, Card, Tab, Typography, Tooltip, Pagination } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import moment from 'moment';
import TreEmToolbar from './TreEmToolbar';
import { TreEmDialog } from './tre-em-dialog';
import { TreEmDrawer } from './tre-em-drawer';

export default function TreEm() {
  const [filterName, setFilterName] = useState('');
  const [doiTuong, setDoiTuong] = useState('');
  const [quan, setQuan] = useState('');
  const [phuong, setPhuong] = useState('');
  const [openWards, setOpenWards] = useState([]);
  const [sponsor, setSponsor] = useState('');
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [childrenList, setChildrenList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterNamNhan, setFilterNamNhan] = useState('');
  const [selectedTreEm, setSelectedTreEm] = useState();
  const [openDialogTreEm, setOpenDialogTreEm] = useState(false);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/treem/getAll?perPage=${itemsPerPage}`;
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
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${event.target.value}&curPage=${page}&perPage=${itemsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${itemsPerPage}&ma_quan=${event.target.value}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${itemsPerPage}&ma_quan=${quan}&ma_phuong=${event.target.value}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${itemsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${event.target.value}`;
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
        const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${itemsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${newPage}&perPage=${itemsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mt-4' >
      <div className='flex justify-center items-center'>
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
          {childrenList?.map((child) => (
            <Grid key={child._id} item xs={4}>
              <TreEmDrawer child={child} id={child._id}/>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* <TreEmDialog openDialog={openDialogTreEm} _id={selectedTreEm} handleClose={handleCloseDialogTreEm} /> */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(total / itemsPerPage)} page={page + 1} onChange={handleChangePage} />
      </Box>
    </div>
  );
}
