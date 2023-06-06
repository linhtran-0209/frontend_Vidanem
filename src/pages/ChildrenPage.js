/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import Button from '@mui/material/Button';

// @mui
import {
  Alert,
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Box,
  Pagination,
  Tooltip,
} from '@mui/material';
// components
import Iconify from '../components/iconify';

import { UserListHead } from '../sections/@dashboard/user';
import { ChildrenToolbar } from '../sections/@dashboard/children';
import { DeleteChildrenModal } from './admin/components/children/DeleteChildrenModal';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Họ tên', alignRight: false },
  { id: 'date', label: 'Ngày sinh', alignRight: false },
  { id: 'school', label: 'Trường', alignRight: false },
  { id: 'hoancanh', label: 'Hoàn cảnh', alignRight: false },
  { id: 'trangthai', label: 'Trạng thái', alignRight: false },
  { id: 'status', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function ChildrenPage() {
  const [total, setTotal] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openErrMessage, setOpenErrMessage] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;

      setChildrenList(data.data);

      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');
  const [filterNamNhan, setFilterNamNhan] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [childrenList, setChildrenList] = useState([]);
  const [trangThai, setTrangThai] = useState('');
  const [quan, setQuan] = useState('');
  const [doiTuong, setDoiTuong] = useState('');
  const [phuong, setPhuong] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [openWards, setOpenWards] = useState([]);

  const handleSearch = async (event) => {
    if (event.key === 'Enter' || !event.key) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

        const { data } = await axios.get(url, { withCredentials: true });

        setChildrenList(data.data);

        setTotal(data.total);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChangeDoiTuong = async (event) => {
    setDoiTuong(event.target.value);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&doituong=${event.target.value}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${event.target.value}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

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
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${event.target.value}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickExportExcel = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}&export=true`;

    await axios
      .get(url, {
        withCredentials: true,
        responseType: 'blob', // set the response type to blob
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Danh sách trẻ em nhận bảo trợ.xlsx';
        a.click();
      });
  };

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    navigate(`/dashboard/children/edit/${row._id}`);
  };

  const handleCloseDelete = async () => {
    setOpenDialogDelete(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&doituong=${doiTuong}&curPage=${page+1}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });

      setChildrenList(data.data);

      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${newPage}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${sponsor}`;

      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;

      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeTrangThai = async (event) => {
    setTrangThai(event.target.value);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${event.target.value}&don_vi_tai_tro=${sponsor}`;

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
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/getAll?hoten=${filterName}&namNhan=${filterNamNhan}&curPage=${page}&perPage=${rowsPerPage}&ma_quan=${quan}&ma_phuong=${phuong}&trang_thai=${trangThai}&don_vi_tai_tro=${event.target.value}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setChildrenList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isNotFound = !childrenList.length;

  const handleClickOpen = () => {
    if (+sessionStorage.getItem('role') !== 3) setOpenErrMessage('Tài khoản không thể thực hiện chức năng này');
    else navigate(`/dashboard/children/insert`);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage]);

  return (
    <>
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Helmet>
        <title> Trẻ Em </title>
      </Helmet>
      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginBottom: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tất cả trẻ em
          </Typography>
          <div>
            {/* <Button
              className="buttonxuatexcel"
              startIcon={<Iconify icon="mdi:microsoft-excel" />}
              onClick={handleClickExportExcel}
            >
              Xuất Excel
            </Button> */}

            <Button
              className="buttonthemtreem"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickOpen}
            >
              Thêm mới
            </Button>
          </div>
        </Stack>

        <Card sx={{ boxShadow: 3 }}>
          <ChildrenToolbar
            filterName={filterName}
            doiTuong={doiTuong}
            onFilterName={handleFilterByName}
            handleChangeDoiTuong={handleChangeDoiTuong}
            quan={quan}
            handleChangeQuan={handleChangeQuan}
            openWards={openWards}
            phuong={phuong}
            handleChangePhuong={handleChangePhuong}
            trangThai={trangThai}
            handleChangeTrangThai={handleChangeTrangThai}
            sponsor={sponsor}
            handleChangeSponsor={handleChangeSponsor}
            onClickSearch={handleSearch}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
              <TableBody>
                {childrenList.map((row) => {
                  const { _id, hoTen, ngaySinh, truong, hoanCanh, donViBaoTro, namNhan, namHoanThanh, authStatus } =
                    row;

                  let trangthai = '';
                  if (authStatus === 'DeXuat') trangthai = 'Đề Xuất';
                  else if (authStatus === 'ChoDuyet') trangthai = 'Chờ Duyệt';
                  else if (authStatus === 'TuChoi') trangthai = 'Từ Chối';
                  else if (authStatus === 'DaDuyet') trangthai = 'Đã Duyệt'
                  else if (authStatus === 'ChoChinhSua') trangthai = 'Chờ Chỉnh Sửa';
                  return (
                    <TableRow
                      hover
                      key={_id}
                      onDoubleClick={(event) => handleRowClick(event, row)}
                      sx={{ cursor: 'pointer', width: '200px', height: '60px' }}
                    >
                      <TableCell align="left">{hoTen}</TableCell>

                      <TableCell align="left">{moment(ngaySinh).format('DD/MM/YYYY')}</TableCell>

                      <TableCell align="left">{truong}</TableCell>
                      <TableCell className="children__hoancanh" align="left">
                        {hoanCanh.length > 25 ? `${hoanCanh.slice(0, 24)}...` : hoanCanh}
                      </TableCell>

                      <TableCell align="left">{trangthai}</TableCell>
                      <TableCell
                        className="icon__container"
                        style={{ justifyContent: 'left', alignItems: 'center' }}
                      >
                        <Tooltip title="Cập nhật">
                          <MenuItem className="children__update" onClick={(event) => handleRowClick(event, row)}>
                            <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                          </MenuItem>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <MenuItem
                            className="children__delete"
                            sx={{ color: 'error.main' }}
                            onClick={(event) => handleDeleteClick(row)}
                          >
                            <Iconify icon={'eva:trash-2-outline'} />
                          </MenuItem>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
              <DeleteChildrenModal
                openDialogDelete={openDialogDelete}
                handleClose={handleCloseDelete}
                row={selectedRow}
              />
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Không tìm thấy
                        </Typography>

                        <Typography variant="body2">
                          Không tìm thấy tài khoản với những thông tin trên &nbsp;
                          <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các lựa chọn.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: 'auto', marginLeft: 30, color: 'gray' }}>
              Có <b>{total}</b> kết quả tìm kiếm
            </p>

            <div style={{ marginRight: 30, marginLeft: 'auto'}}>
              <Pagination count={Math.ceil(total / rowsPerPage)} page={page + 1} onChange={handleChangePage} />
            </div>
          </Box>
        </Card>
      </Container>
    </>
  );
}
