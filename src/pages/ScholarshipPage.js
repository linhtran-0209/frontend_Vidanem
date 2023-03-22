import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// @mui
import {
  Alert,
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
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { EditModal } from './admin/components/scholarship/EditModal';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import { CreateModal } from './admin/components/scholarship/CreateModal';
import { DeleteModal } from './admin/components/scholarship/DeleteModal';
import ScholarshipToolbar from '../sections/@dashboard/scholarship/ScholarshipToolbar';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ma_hoc_bong', label: 'Mã học bổng', alignRight: false },
  { id: 'ten_hoc_bong', label: 'Tên học bổng', alignRight: false },
  { id: 'so_luong', label: 'Số lượng', alignRight: false },
  { id: 'ghi_chu', label: 'Ghi chú', alignRight: false },
  { id: 'action', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function ScholarshipPage() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [ScholarshipList, setScholarshipList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openScholarshipCreate, setOpenScholarshipCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    getScholarship();
  }, []);

  const getScholarship = async () => {
    try {
      const url = `http://localhost:5000/api/v1/scholarship/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setScholarshipList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      const url = `http://localhost:5000/api/v1/scholarship/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setScholarshipList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpenCreate = () => {
    setOpenScholarshipCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenScholarshipCreate(false);
  };

  const handleCloseEdit = async () => {
    setOpenDialogEdit(false);

    try {
      const url = `http://localhost:5000/api/v1/scholarship/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setScholarshipList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `http://localhost:5000/api/v1/scholarship/getAll?keyword=${filterName}&curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setScholarshipList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
    console.log(selectedRow);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !ScholarshipList.length && !!filterName;

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Helmet>
        <title> Nhà tài trợ</title>
      </Helmet>

      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginBottom: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đơn vị bảo trợ
          </Typography>
          <Button
            className="buttonThemMoi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreate}
          >
            Thêm mới
          </Button>
        </Stack>
        <CreateModal openDialogCreate={openScholarshipCreate} handleClose={handleCloseCreate} />
        <Card>
          <ScholarshipToolbar filterName={filterName} onFilterName={handleFilterByName} onClickSearch={handleSearch} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {ScholarshipList.map((row) => {
                    const { _id, maHocBong, tenHocBong, soLuong, ghiChu, donViTaiTro } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        onDoubleClick={(event) => handleRowClick(event, row)}
                        sx={{ cursor: 'pointer', width: '200px', height: '10px' }}
                      >
                        <TableCell align="left" style={{ width: 180 }}>
                          {maHocBong}
                        </TableCell>

                        <TableCell align="left">{tenHocBong}</TableCell>

                        <TableCell align="left" style={{ width: 180 }}>
                          {soLuong}
                        </TableCell>

                        <TableCell align="left">{ghiChu}</TableCell>

                        <TableCell style={{ display: 'inline-flex', width: 50 }} align="center">
                          <MenuItem
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            onClick={(event) => handleRowClick(event, row)}
                          >
                            <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                          </MenuItem>

                          <MenuItem
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            sx={{ color: 'error.main' }}
                            onClick={(event) => handleDeleteClick(row)}
                          >
                            <Iconify icon={'eva:trash-2-outline'} />
                          </MenuItem>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
                {openDialogEdit && (
                  <EditModal setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />
                )}

                {openDialogDelete && (
                  <DeleteModal openDialogDelete={openDialogDelete} handleClose={handleCloseDelete} row={selectedRow} />
                )}

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