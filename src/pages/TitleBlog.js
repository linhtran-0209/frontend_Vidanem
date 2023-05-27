import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import Iconify from '../components/iconify';
import { UserListHead } from '../sections/@dashboard/user';

import { CreateTitleModal } from './admin/components/title/CreateTitleBlog';
import { EditTitleBlog } from './admin/components/title/EditTitleBlog';
import { DeleteTitleBlog } from './admin/components/title/DeleteTitleBlog';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'hinh_anh', label: 'Ảnh chủ đề', alignRight: false },
  { id: 'ten_chu_de', label: 'Tên chủ đề', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openTitleBlogCreate, setOpenTitleBlogCreate] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [TitleList, setTitleList] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;
  const [filterName, setFilterName] = useState('');
  const [selectedRow, setSelectedRow] = useState({});
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const isNotFound = !TitleList.length && !!filterName;

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const handleCloseDelete = async () => {
    setOpenDialogDelete(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/chude/getAll?curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setTitleList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleClickOpenCreate = () => {
    setOpenTitleBlogCreate(true);
  };

  const handleCloseCreate = async () => {
    setOpenTitleBlogCreate(false);
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/chude/getAll?curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setTitleList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseEdit = async () => {
    setOpenDialogEdit(false);

    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/chude/getAll?curPage=${page+1}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setTitleList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTitles();
  }, []);

  const getTitles = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/chude/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setTitleList(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title> Tin bài </title>
      </Helmet>

      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginTop: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chủ đề
          </Typography>

          <Button
            className="buttonThemMoi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreate}
          >
            Chủ đề mới
          </Button>
        </Stack>
        <CreateTitleModal openDialogCreate={openTitleBlogCreate} handleClose={handleCloseCreate} />
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
              <TableBody>
                {TitleList.map((row) => {
                  const { _id, hinhAnh, tenChuDe } = row;

                  return (
                    <TableRow
                      hover
                      key={_id}
                      sx={{ cursor: 'pointer', width: '200px', height: '10px' }}
                      onDoubleClick={(event) => handleRowClick(event, row)}
                    >
                      <TableCell align="center" style={{ width: 250, height: 60 }}>
                        <img
                          src={`${process.env.REACT_APP_API_URL}${hinhAnh}`}
                          alt="Ảnh chủ đề"
                          width="60"
                          height="60"
                        />
                      </TableCell>

                      <TableCell align="left" style={{ width: 550, height: 60 }}>
                        {tenChuDe}
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
              {openDialogEdit && (
                <EditTitleBlog setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />
              )}

              <DeleteTitleBlog openDialogDelete={openDialogDelete} handleClose={handleCloseDelete} row={selectedRow} />

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
