import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import Button from '@mui/material/Button';

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
  MenuItem,
} from '@mui/material';
import moment from 'moment';
// components
import { UserListHead } from '../sections/@dashboard/user';
import Iconify from '../components/iconify';
import { DeleteModal } from './admin/components/blog/DeleteModal';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ma_bai_viet', label: 'Mã tin bài', alignRight: false },
  { id: 'ten_tin_bai', label: 'Tiêu đề', alignRight: false },
  { id: 'ten_chu_de', label: 'Ngày tạo', alignRight: false },
  { id: 'trang_thai', label: 'Trạng thái', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [listTinTuc, setListTinTuc] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;
  const [filterName, setFilterName] = useState('');
  const [selectedRow, setSelectedRow] = useState({});
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const isNotFound = !listTinTuc.length && !!filterName;

  useEffect(() => {
    getTinTuc();
  }, []);

  const getTinTuc = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setListTinTuc(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickAddNew = () => {
    navigate(`/dashboard/blog/insert`);
  };

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    navigate(`/dashboard/blog/edit/${row._id}`);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };

  return (
    <>
      <Helmet>
        <title> Tin bài </title>
      </Helmet>

      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginTop: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tin bài
          </Typography>
          <Button
            className="buttonThemMoi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickAddNew}
          >
            Bài viết mới
          </Button>
        </Stack>
        <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {listTinTuc.map((row) => {
                    const { _id, anhTieuDe, tieuDe, createdAt, authStatus } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;
                    let trangthai = '';
                    if (authStatus === 'DeXuat') trangthai = 'Đề Xuất';
                    else if (authStatus === 'ChoDuyet') trangthai = 'Chờ Duyệt';
                    else if (authStatus === 'TuChoi') trangthai = 'Từ Chối';
                    else trangthai = 'Đã Duyệt';
                    return (
                      <TableRow hover key={_id} sx={{ cursor: 'pointer', width: '200px', height: '10px' }}>
                      <TableCell align="center" style={{ width: 200, height: 60 }}>
                        <img
                          src={`${process.env.REACT_APP_API_URL}${anhTieuDe}`}
                          alt="Ảnh chủ đề"
                          width="100"
                          height="60"
                        />
                      </TableCell>

                        <TableCell align="left" style={{ width: 550 }}>
                          {tieuDe}
                        </TableCell>

                        <TableCell align="left" style={{ width: 180 }}>
                          {moment(createdAt).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell align="left" style={{ width: 150 }}>
                          {trangthai}
                        </TableCell>

                        <TableCell
                        className="icon__container"
                        style={{ justifyContent: 'left', alignItems: 'center', height: 100 }}
                      >
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

          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(total / rowsPerPage)} page={page + 1} />
          </Box>
        </Card>
      </Container>
    </>
  );
}
