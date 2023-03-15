import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Pagination
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { InsertModal } from './admin/components/sponsor/InsertModal';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import { CreateModal } from './admin/components/sponsor/CreateModal';
import SponserToolbar from '../sections/@dashboard/sponsers/SponserToolbar';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ma_don_vi', label: 'Mã đơn vị', alignRight: false },
  { id: 'name', label: 'Tên đơn vị', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'so_luong_da_trao', label: 'Đã trao', alignRight: false },
  { id: 'action', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function SponserPage() {
  useEffect(() => {
    getSponser();
  }, []);

  const getSponser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total)
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  // const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  // const [orderBy, setOrderBy] = useState('email');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openSponsorCreate, setOpenSponsorCreate] = React.useState(false);
  const [openDialogInsert, setOpenDialogInsert] = React.useState(false);
  const [currentId, setCurrentId] = useState('');

  const handleSearch = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total)
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpenCreate = () => {
    setOpenSponsorCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenSponsorCreate(false);
  };

  const handleClickOpenInsert = (event, row) => {
    setSelectedRow(row);
    setOpenDialogInsert(true);
  };

  const handleCloseInsert = () => {
    setOpenDialogInsert(false);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage-1);
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?keyword=${filterName}&curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total)
    } catch (err) {
      console.log(err);
    }
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !SPONSERLIST.length && !!filterName;
  const [opendialog, setOpenDialog] = React.useState(false);

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpenCreate}>
            Thêm mới
          </Button>
        </Stack>
        <CreateModal openDialogCreate={openSponsorCreate} handleClose={handleCloseCreate} />
        <Card>
          <SponserToolbar filterName={filterName} onFilterName={handleFilterByName} onClickSearch={handleSearch} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={SPONSERLIST.length} />
                <TableBody>
                  {SPONSERLIST.map((row) => {
                    const { _id, maDonVi, tenDonVi, SDT, soLuongDaTrao } = row;
                    // const selectedUser = selected.indexOf(tenDonVi) !== -1;
                    const info = { _id };

                    return (
                      <TableRow hover key={_id}  onClick={(event) => handleRowClick(event, row)} sx={{ cursor: 'pointer', width: '200px', height: '10px' }}>

                        <TableCell align="left" sx={{ width: '80px' }}>{maDonVi}</TableCell>

                        <TableCell align="left" sx={{ width: '180px' }}>{tenDonVi}</TableCell>

                        <TableCell align="left" sx={{ width: '180px' }}>{SDT}</TableCell>

                        <TableCell align="left" sx={{ width: '20px' }}>{soLuongDaTrao}</TableCell>

                        <TableCell align="center" sx={{ width: '20px' }}>
                          <DeleteOutlineIcon color="error" />
                         
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
                <InsertModal
                  openDialogInsert={openDialogInsert}
                  handleClose={handleCloseInsert}
                  id={currentId}
                  // email={currentEmail}
                  // quyen={currentRole}
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
                            Không tìm thấy đươn vị bảo trợ có tên là &nbsp;
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

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            rowsPerPage={rowsPerPage} 
          /> */}
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(total / rowsPerPage)} page={page+1} onChange={handleChangePage} />
          </Box>
        </Card>
      </Container>
    </>
  );
}
