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
import { EditModal } from './admin/components/doiTuong/EditModal';
// sections
import DoiTuongListHead from '../sections/@dashboard/doituong/DoiTuongListHead';
import { CreateModal } from './admin/components/doiTuong/CreateModal';
import { DeleteModal } from './admin/components/doiTuong/DeleteModal';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ma', label: 'Mã', alignRight: false },
  { id: 'ten', label: 'Tên', alignRight: false },
  { id: 'so_luong', label: 'Số lượng', alignRight: false },
  { id: 'action', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function DoiTuongPage() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [doiTuongList, setDoiTuongList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openScholarshipCreate, setOpenScholarshipCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  useEffect(() => {
    getDoiTuongs();
  }, []);

  const getDoiTuongs = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/doituong/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setDoiTuongList(data.data);
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
      const url = `${process.env.REACT_APP_API_URL}/doituong/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setDoiTuongList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `${process.env.REACT_APP_API_URL}/namhoc/getAll?curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setDoiTuongList(data.data);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !doiTuongList.length && !!filterName;

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
          {/* <ScholarshipToolbar filterName={filterName} onFilterName={handleFilterByName} onClickSearch={handleSearch} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DoiTuongListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {doiTuongList.map((row) => {
                    const { _id, ma, ten, soLuong } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        onDoubleClick={(event) => handleRowClick(event, row)}
                        sx={{ cursor: 'pointer', width: '200px', height: '10px' }}
                      >
                        <TableCell align="center" style={{}}>
                          {ma}
                        </TableCell>

                        <TableCell align="center" style={{ width: 350 }}>
                          {ten}
                        </TableCell>

                        <TableCell align="center" style={{ width: 350 }}>
                          {soLuong}
                        </TableCell>

                        <TableCell className="icon__scholarship__container">
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