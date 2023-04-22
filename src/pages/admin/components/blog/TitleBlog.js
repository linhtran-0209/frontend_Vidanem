import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import { UserListHead } from '../../../../sections/@dashboard/user';
import Iconify from './preview/Iconify';

import {CreateTitleModal } from './CreateTitleBlog';

import Scrollbar from './preview/Scrollbar';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ma_chu_de', label: 'Mã chủ đề', alignRight: false },
  { id: 'ten_chu_de', label: 'Tên chủ đề', alignRight: false },
  { id: 'ghi_chu', label: 'Ghi chú', alignRight: false },
  { id: 'bat_dau', label: 'Bắt đầu', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [opendialog, setOpenDialog] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openTitleBlogCreate, setOpenTitleBlogCreate] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [TitleList, setTitleList] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;
  const [filterName, setFilterName] = useState('');
  const isNotFound = !TitleList.length && !!filterName;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClickOpenCreate = () => {
    setOpenTitleBlogCreate(true);
    console.log(openTitleBlogCreate);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseCreate = () => {
    setOpenTitleBlogCreate(false);
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
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {TitleList.map((row) => {
                    const { _id, maChuDe, tenChuDe, batDau, ketThuc } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;

                    return (
                      <TableRow hover key={_id} sx={{ cursor: 'pointer', width: '200px', height: '10px' }}>
                        <TableCell align="left" style={{ width: 180 }}>
                          {maChuDe}
                        </TableCell>

                        <TableCell align="left" style={{ width: 350 }}>
                          {tenChuDe}
                        </TableCell>

                        <TableCell align="left" style={{ width: 180 }}>
                          {moment(batDau).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell align="left" style={{ width: 250 }}>
                          {moment(ketThuc).format('DD/MM/YYYY')}
                        </TableCell>

                        <TableCell className="icon__scholarship__container">
                          <Tooltip title="Cập nhật">
                            <MenuItem className="scholarship__update">
                              <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                            </MenuItem>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <MenuItem className="scholarship__delete" sx={{ color: 'error.main' }}>
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
                {/* {openDialogEdit && (
                  <EditModal setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />
                )}

                {openDialogDelete && (
                  <DeleteModal openDialogDelete={openDialogDelete} handleClose={handleCloseDelete} row={selectedRow} />
                )} */}

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
            <Pagination count={Math.ceil(total / rowsPerPage)} page={page + 1} />
          </Box>
        </Card>
      </Container>
    </>
  );
}
