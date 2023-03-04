/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
import { sentenceCase } from 'change-case';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Modal,
  Box,
  Popover,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import create from './admin/addingPage/AddingPageUser';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'quan', label: 'Tỉnh/Thành phố', alignRight: false },
  { id: 'phuong', label: 'Quận/Huyện', alignRight: false },
  { id: 'isVerified', label: 'Quyền', alignRight: false },
  { id: 'status', label: 'Hành động', alignRight: false },
];

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

export default function UserPage() {
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/account/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setUSERLIST(data.data);
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

  const [USERLIST, setUSERLIST] = useState([]);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const [opendialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const [quyen, setQuyen] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setQuyen(event.target.value);
  };
  return (
    <>
      <Helmet>
        <title> Tài khoản</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tất cả tài khoản
          </Typography>

          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
            Tài khoản mới
          </Button>
        </Stack>
        <Dialog open={opendialog} onClose={handleClose}>
          <DialogTitle>Thêm tài khoản mới</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Địa chỉ Email"
              type="email"
              fullWidth
              variant="standard"
            />
            {/* <TextField
              autoFocus
              margin="dense"
              id="isVerified"
              label="Quyền"
              type="text"
              fullWidth
              variant="standard"
            /> */}
            <FormControl variant="standard" sx={{ m: 0, minWidth: 550 }}>
              <InputLabel id="demo-simple-select-standard-label">Quyền</InputLabel>
              <Select
                autoFocus
                labelId="quyen"
                id="quyen"
                value={quyen}
                onChange={handleChange}
                label="Quyền"
                fullWidth
                margin="dense"
              >
                <MenuItem value={1}>Quyền 1</MenuItem>
                <MenuItem value={2}>Quyền 2</MenuItem>
                <MenuItem value={3}>Quyền 3</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="standard" sx={{ m: 0, minWidth: 550 }}>
              <InputLabel id="demo-simple-select-standard-label">Quận</InputLabel>
              <Select
                autoFocus
                labelId="quan"
                id="quan"
                value={quyen}
                onChange={handleChange}
                label="Quận"
                fullWidth
                margin="dense"
              >
                <MenuItem value={769}>Thành phố Thủ Đức</MenuItem>
                <MenuItem value={760}>Quận 1</MenuItem>
                <MenuItem value={770}>Quận 3</MenuItem>
                <MenuItem value={773}>Quận 4</MenuItem>
                <MenuItem value={774}>Quận 5</MenuItem>
                <MenuItem value={775}>Quận 6</MenuItem>
                <MenuItem value={778}>Quận 7</MenuItem>
                <MenuItem value={776}>Quận 8</MenuItem>
                <MenuItem value={771}>Quận 10</MenuItem>
                <MenuItem value={772}>Quận 11</MenuItem>
                <MenuItem value={761}>Quận 12</MenuItem>
                <MenuItem value={764}>Quận Gò Vấp</MenuItem>
                <MenuItem value={765}>Quận Bình Thạnh</MenuItem>
                <MenuItem value={766}>Quận Tân Bình</MenuItem>
                <MenuItem value={767}>Quận Tân Phú</MenuItem>
                <MenuItem value={768}>Quận Phú Nhuận</MenuItem>
                <MenuItem value={777}>Quận Bình Tân</MenuItem>
                <MenuItem value={783}>Huyện Củ Chi</MenuItem>
                <MenuItem value={784}>Huyện Hóc Môn</MenuItem>
                <MenuItem value={785}>Huyện Bình Chánh</MenuItem>
                <MenuItem value={786}>Huyện Nhà Bè</MenuItem>
                <MenuItem value={787}>Huyện Cần Giờ</MenuItem>
                <MenuItem value={784}>Huyện Hóc Môn</MenuItem>
                <MenuItem value={785}>Huyện Bình Chánh</MenuItem>
              </Select>
            </FormControl>
            <TextField autoFocus margin="dense" id="phuong" label="Phường" type="text" fullWidth variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Thêm tài khoản</Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, email, quan, phuong, quyen } = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow
                        style={{ height: 40 }}
                        hover
                        key={_id}
                        tabIndex={-1}
                        phuong="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell style={{ height: 0, padding: 5 }}>
                          <Checkbox
                            style={{ height: 10 }}
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, email)}
                          />
                        </TableCell>

                        <TableCell style={{ height: 40, padding: 5 }}>
                          <Stack style={{ height: 20 }} direction="row" alignItems="center" spacing={2}>
                            <Typography sx={{ height: 18 }} variant="subtitle2" noWrap>
                              {email}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          {quan}
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          {phuong}
                        </TableCell>

                        <TableCell style={{ padding: 30 }} align="left">
                          {quyen}
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          <IconButton style={{ height: 40 }} size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify style={{ height: 40 }} icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, border: 1 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, border: 1 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
