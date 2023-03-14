import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import {InsertModal} from './admin/components/sponsor/InsertModal';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import { CreateModal } from './admin/components/sponsor/CreateModal';
import SponserToolbar from '../sections/@dashboard/sponsers/SponserToolbar';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên đơn vị', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'tong_so_luong', label: 'Tổng số lượng', alignRight: false },
  { id: 'tong_so_tien', label: 'Tổng số tiền', alignRight: false },
  { id: 'mo_ta', label: 'Mô tả', alignRight: false },
  { id: 'status', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SponserPage() {
  useEffect(() => {
    getSponser();
  }, []);

  const getSponser = async () => {
    try {
      const url = `http://localhost:5000/sponsor/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('email');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [openSponsorCreate, setOpenSponsorCreate] = React.useState(false);
  const [openDialogInsert, setOpenDialogInsert] = React.useState(false);
  const [currentId, setCurrentId] = useState('');

  const handleOpenMenu = (event) => {
    console.log(event.currentTarget);
    setOpen(event.currentTarget);
    
  
    setCurrentId(event.currentTarget.value);
      // setCurrentEmail(event.currentTarget.value);
      // console.log(event.currentTarget.value);
    console.log(event.currentTarget.value);
    
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const handleClickOpenCreate = () => {
    setOpenSponsorCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenSponsorCreate(false);
  };
  const handleClickOpenInsert = (e) => {
    console.log(e);
    // setCurrentRole(quyen)
    setOpenDialogInsert(true);
    // console.log(row);
  };

  
  const handleCloseInsert = () => {
    setOpenDialogInsert(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = SPONSERLIST.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, tenDonVi) => {
    const selectedIndex = selected.indexOf(tenDonVi);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, tenDonVi);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SPONSERLIST.length) : 0;

  const filteredSponsers = applySortFilter(SPONSERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredSponsers.length && !!filterName;
  const [opendialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
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
            Tất cả đơn vị bảo trợ
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpenCreate}>
            Đơn vị bảo trợ mới
          </Button>
        </Stack>
        <CreateModal openDialogCreate={openSponsorCreate} handleClose={handleCloseCreate} />
        <Card>
          <SponserToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={SPONSERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredSponsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, tenDonVi, SDT, tongSoLuong, tongSoTien, moTa } = row;
                    const selectedUser = selected.indexOf(tenDonVi) !== -1;
                    const info = { _id};
                    
                    return (
                      <TableRow hover key={_id} tabIndex={-1} ma_phuong="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, tenDonVi)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {tenDonVi}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{SDT}</TableCell>

                        <TableCell align="left">{tongSoLuong}</TableCell>

                        <TableCell align="left">{tongSoTien}</TableCell>
                        <TableCell align="left">{moTa}</TableCell>

                        <TableCell align="right">
                          <IconButton 
                            style={{ height: 40 }}
                            size="large"
                            color="inherit"
                            // value={[[info.email]]}
                            value={[[info._id]]}
                            // role={info.quyen}
                            onClick={handleOpenMenu}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                        <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={handleClickOpenInsert}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, border: 1 }} />
                            Edit
                          </MenuItem>

                          <MenuItem sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, border: 1 }} />
                            Delete
                          </MenuItem>
                        </Popover>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
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
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={SPONSERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
