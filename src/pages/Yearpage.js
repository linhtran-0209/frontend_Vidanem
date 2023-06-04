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
  Tooltip,
} from '@mui/material';
import moment from 'moment';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { EditModal } from './admin/components/year/EditModal';
// sections
import YearListHead from '../sections/@dashboard/year/YearListHead';
import { CreateModal } from './admin/components/year/CreateModal';
import { DeleteModal } from './admin/components/year/DeleteModal';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nam_hoc', label: 'Năm học', alignRight: false },
  // { id: 'nam_hoc', label: 'Năm học', alignRight: false },
  { id: 'bat_dau', label: 'Bắt đầu', alignRight: false },
  { id: 'ket_thuc', label: 'Kết thúc', alignRight: false },
  { id: 'nam_hien_tai', label: 'Năm hiện tại', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function YearPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [YearsList, setYearsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openScholarshipCreate, setOpenScholarshipCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    getYears();
  }, []);

  const getYears = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setYearsList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpenCreate = () => {
    setOpenScholarshipCreate(true);
  };
  const handleCloseCreate = async () => {
    setOpenScholarshipCreate(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?curPage=${page + 1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setYearsList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseEdit = async () => {
    setOpenDialogEdit(false);

    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?curPage=${page + 1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setYearsList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setYearsList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !YearsList.length;

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleCloseDelete = async () => {
    setOpenDialogDelete(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/namhoc/getAll?curPage=${page + 1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setYearsList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
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
            Năm học
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
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <YearListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {YearsList.map((row) => {
                    const { _id, namHoc, batDau, ketThuc, namHienTai } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        onDoubleClick={(event) => handleRowClick(event, row)}
                        sx={{ cursor: 'pointer', width: '200px', height: '10px' }}
                      >
                        <TableCell align="center" style={{}}>
                          {namHoc}
                        </TableCell>

                        {/* <TableCell align="left" style={{ width: 350 }}>
                          {namHoc}
                        </TableCell> */}

                        <TableCell align="center" style={{}}>
                          {moment(batDau).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell align="center" style={{}}>
                          {moment(ketThuc).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell style={{ width: '150', justifyContent: 'center' }}>
                          {namHienTai && (
                            <Tooltip title="Năm học hiện tại">
                              <MenuItem style={{ justifyContent: 'center' }}>
                                <Iconify style={{ color: 'orange' }} icon={'mdi:white-balance-sunny'} />
                              </MenuItem>
                            </Tooltip>
                          )}
                        </TableCell>

                        <TableCell className="icon__container" style={{ alignItems: 'center' }}>
                          <Tooltip title="Cập nhật">
                            <MenuItem className="scholarship__update" onClick={(event) => handleRowClick(event, row)}>
                              <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                            </MenuItem>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <MenuItem
                              className="scholarship__delete"
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
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>

                <EditModal setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />

                <DeleteModal openDialogDelete={openDialogDelete} handleClose={handleCloseDelete} row={selectedRow} />

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
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

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
