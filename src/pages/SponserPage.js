import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Box,
  Pagination,
  MenuItem,
  Tooltip,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { EditModal } from './admin/components/sponsor/EditModal';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import { CreateModal } from './admin/components/sponsor/CreateModal';
import { DeleteSponsorModal } from './admin/components/sponsor/DeleteSponsorModal';
import { CreateSponsorExcelModal } from './admin/components/sponsor/CreateSponsorExcelModal';
import SponserToolbar from '../sections/@dashboard/sponsers/SponserToolbar';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'logo', label: 'Logo', alignRight: false },
  { id: 'ma_don_vi', label: 'Mã đơn vị', alignRight: false },
  { id: 'name', label: 'Tên đơn vị', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'so_luong_da_trao', label: 'Đã trao', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function SponserPage() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openSponsorCreate, setOpenSponsorCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openCreateExcelModal, setOpenCreateExcelModal] = React.useState(false);

  useEffect(() => {
    getSponser();
  }, []);

  const getSponser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter' || !event.key) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
        const { data } = await axios.get(url, { withCredentials: true });
        // const  parse=data.data.email;
        setSPONSERLIST(data.data);
        setTotal(data.total);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickExportExcel = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}&export=true`;
    await axios
      .get(url, {
        withCredentials: true,
        responseType: 'blob', // set the response type to blob
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Danh sách đơn vị tài trợ.xlsx';
        a.click();
      });
  };

  const handleClickOpenCreateExcelModal = () => {
    setOpenCreateExcelModal(true);
  };

  const handleCloseCreateExcel = async () => {
    setOpenCreateExcelModal(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpenCreate = () => {
    setOpenSponsorCreate(true);
  };
  const handleCloseCreate = async () => {
    setOpenSponsorCreate(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseEdit = async () => {
    setOpenDialogEdit(false);

    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !SPONSERLIST.length && !!filterName;

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleCloseDelete = async () => {
    setOpenDialogDelete(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/sponsor/getAll?keyword=${filterName}&curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Nhà tài trợ</title>
      </Helmet>

      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginBottom: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đơn vị bảo trợ
          </Typography>
          <div>
            <Button
              className="buttondanhsach"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickOpenCreateExcelModal}
            >
              Nhập từ Excel
            </Button>
            <Button
              className="buttonxuatexcel"
              startIcon={<Iconify icon="mdi:microsoft-excel" />}
              onClick={handleClickExportExcel}
            >
              Xuất Excel
            </Button>
            <Button
              className="buttonthemdonvi"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickOpenCreate}
            >
              Thêm mới
            </Button>
          </div>
          {/* <Button
            // className="buttonThemMoi"
            className="buttonthemdonvi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreate}
          >
            Thêm mới
          </Button> */}
        </Stack>
        <CreateSponsorExcelModal opencreateExcelModal={openCreateExcelModal} handleClose={handleCloseCreateExcel} />

        <CreateModal openDialogCreate={openSponsorCreate} handleClose={handleCloseCreate} />
        <Card>
          <SponserToolbar filterName={filterName} onFilterName={handleFilterByName} onClickSearch={handleSearch} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {SPONSERLIST.map((row) => {
                    const { _id, logo, maDonVi, tenDonVi, SDT, soLuongDaTrao } = row;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        onDoubleClick={(event) => handleRowClick(event, row)}
                        sx={{ cursor: 'pointer', width: '200px', height: '60px' }}
                      >
                        <TableCell align="center" textAlign='center' style={{width:'15%'}}>
                          <img src={logo} alt="Logo" width="60" height="60" />
                        </TableCell>

                        <TableCell align="left" style={{width:'10%'}}>{maDonVi}</TableCell>

                        <TableCell align="left" style={{width:'35%'}}>
                        {tenDonVi.length > 60 ? `${tenDonVi.slice(0, 60)}...` : tenDonVi}</TableCell>

                        <TableCell align="left" style={{width:'20%'}}>
                        {SDT.length > 20 ? `${SDT.slice(0, 20)}...` : SDT}</TableCell>

                        <TableCell align="left" style={{width:'10%'}}>{soLuongDaTrao}</TableCell>

                        <TableCell className="icon__container" style={{ justifyContent: 'left', alignItems: 'center',height: 100 , width:'10%' }}>
                          <Tooltip title="Cập nhật">
                            <MenuItem className="sponser__update" onClick={(event) => handleRowClick(event, row)}>
                              <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                            </MenuItem>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <MenuItem
                              className="sponser__delete"
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

                </TableBody>

                <EditModal setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />

                <DeleteSponsorModal
                  openDialogDelete={openDialogDelete}
                  handleClose={handleCloseDelete}
                  row={selectedRow}
                />

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không tìm thấy đơn vị bảo trợ có tên là &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(total / rowsPerPage)} page={page + 1} onChange={handleChangePage} />
          </Box>
        </Card>
      </Container>
    </>
  );
}
