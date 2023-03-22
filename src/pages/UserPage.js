/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
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
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { CreateUserModal } from './admin/components/user/CreateUserModal';
import { CreateUserExcelModal } from './admin/components/user/CreateUserExcelModal';
import { InsertUserModal } from './admin/components/user/InsertUserModal';
import { DeleteUserModal } from './admin/components/user/DeleteUserModal';
import { ChangeActiveUserModal } from './admin/components/user/ChangeActiveUserModal';

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
  { id: 'hoTen', label: 'Họ tên', alignRight: false },
  { id: 'quan', label: 'Quận/Huyện', alignRight: false },
  { id: 'phuong', label: 'Phưòng/Xã', alignRight: false },
  { id: 'isVerified', label: 'Quyền', alignRight: false },
  { id: 'isActive', label: 'Trạng thái', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
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
  const [USERLIST, setUSERLIST] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/account/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      // console.log(data.data);
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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRole, setCurrentRole] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    console.log(event.currentTarget);
    setCurrentRole(event.currentTarget.role);
    setCurrentEmail(event.currentTarget.value);
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
      // console.log(USERLIST);
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
  const [selectedRow, setSelectedRow] = useState({});
  const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
  const [openCreateExcelModal, setOpenCreateExcelModal] = React.useState(false);
  const [openDialogInsert, setOpenDialogInsert] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openDialogChangeActive, setOpenDialogChangeActive] = React.useState(false);

  const handleClickOpenCreate = () => {
    setOpenDialogCreate(true);
  };
  const handleClickOpenCreateExcelModal = () => {
    setOpenCreateExcelModal(true);
  };
  const handleClickOpenInsert = (event, row) => {
    // console.log(e);
    // setCurrentRole(quyen)
    setSelectedRow(row);
    setOpenDialogInsert(true);
    console.log(row);
  };
  const handleClickOpenDelete = (event, row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };
  const handleClickOpenChangeActive = (event, row) => {
    setSelectedRow(row);
    setOpenDialogChangeActive(true);
  };
  const handleCloseCreate = () => {
    setOpenDialogCreate(false);
  };
  const handleCloseCreateExcel = () => {
    setOpenCreateExcelModal(false);
  };

  // console.log(openDialogInsert);

  const handleCloseInsert = () => {
    setOpenDialogInsert(false);
  };
  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleCloseChangeActive = () => {
    setOpenDialogChangeActive(false);
  };
  // const [quyen, setQuyen] = React.useState('');
  // const [quan, setQuan] = React.useState('');
  // const [phuong, setPhuong]=useState([]);
  // const [openWards, setOpenWards] = useState([]);

  // const handleChangeQuyen = (event) => {
  //   console.log(event.target.value);
  //   setQuyen(event.target.value);
  // };

  // const handleChangeQuan = async (event) => {

  //   try {
  //     setQuan(event.target.value)
  //     const url = `https://provinces.open-api.vn/api/d/${event.target.value}?depth=2`;
  //     const { data } = await axios.get(url);
  //     // const  parse=data.data.email;
  //     console.log(data);
  //     // setUSERLIST(data.data);
  //     setOpenWards(data.wards)

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleChangePhuong = (event) => {

  //   setPhuong(event.target.value)
  //   console.log(event.target.value)
  // };

  return (
    <>
      <Helmet>
        <title> Tài khoản</title>
      </Helmet>

      <Container style={{ marginTop: -10 }}>
        <Stack style={{ marginBottom: 16 }} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tất cả tài khoản
          </Typography>
          <Button
            className="buttondanhsach"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreateExcelModal}
          >
            Danh sách
          </Button>
          <Button
            className="buttonThemMoi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreate}
          >
            Tài khoản mới
          </Button>
        </Stack>
        <CreateUserExcelModal opencreateExcelModal={openCreateExcelModal} handleClose={handleCloseCreateExcel} />
        <CreateUserModal
          opendialogcreate={openDialogCreate}
          handleClose={handleCloseCreate}
          // quyen={quyen}
          // quan={quan}
          // phuong={phuong}
          // openWards={openWards}
          // handleChangeQuyen={handleChangeQuyen}
          // handleChangeQuan={handleChangeQuan}
          // handleChangePhuong={handleChangePhuong}
        />
        <Card sx={{ boxShadow: 3 }}>
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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { _id, email, hoTen, quan, phuong, isActive } = row;
                    let quyen = '';
                    if (row.quyen === 1) quyen = 'Hội đồng Đội Thành phố';
                    else if (row.quyen === 2) quyen = 'Hội đồng Đội quận, huyện';
                    else quyen = 'Cấp Liên đội';
                    const selectedUser = selected.indexOf(email) !== -1;
                    const info = { quyen, email };

                    return (
                      <TableRow
                        style={{ height: 40, borderBottom: '1.59px solid rgba(192,192,192,0.3)' }}
                        hover
                        key={_id}
                        tabIndex={-1}
                        phuong="checkbox"
                        selected={selectedUser}
                      >
                        {/* <TableCell style={{ height: 0, padding: 5 }}>
                          <Checkbox
                            style={{ height: 10 }}
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, email)}
                          />
                        </TableCell> */}

                        <TableCell style={{ height: 40, padding: 13 }}>
                          <Stack style={{ height: 20 }} direction="row" alignItems="center" spacing={2}>
                            {email}
                          </Stack>
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          {hoTen}
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          {quan}
                        </TableCell>

                        <TableCell style={{ height: 40 }} align="left">
                          {phuong}
                        </TableCell>

                        <TableCell style={{ paddingLeft: 17 }} align="left">
                          {quyen}
                        </TableCell>
                        <TableCell style={{ padding: 0 }} align="center">
                          {isActive && (
                            <MenuItem
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={(event) => handleClickOpenChangeActive(event, row)}
                            >
                              <Iconify style={{ color: 'green' }} icon={'eva:unlock-outline'} />
                            </MenuItem>
                          )}
                          {!isActive && (
                            <MenuItem
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={(event) => handleClickOpenChangeActive(event, row)}
                            >
                              <Iconify style={{ color: 'red' }} icon={'eva:lock-outline'} />
                            </MenuItem>
                          )}
                        </TableCell>

                        {/* <TableCell style={{ height: 40 }} align="left">
                          <IconButton
                            style={{ height: 40 }}
                            size="large"
                            color="inherit"
                            value={[[info.email]]}
                            role={info.quyen}
                            onClick={handleOpenMenu}
                          >
                            <Iconify style={{ height: 40 }} icon={'eva:more-vertical-fill'} />
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
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        > */}
                        <TableCell
                          className="colusericon"
                          // style={{ height: 40, display: 'inline-flex', padding: 0, borderBottom: '0', marginTop: 8 }}
                          // align="center"
                        >
                          <MenuItem className="updateuser" onClick={(event) => handleClickOpenInsert(event, row)}>
                            <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                          </MenuItem>

                          <MenuItem
                            className="deleteuser"
                            sx={{ color: 'error.main' }}
                            onClick={(event) => handleClickOpenDelete(event, row)}
                          >
                            <Iconify icon={'eva:trash-2-outline'} />
                          </MenuItem>
                        </TableCell>

                        {/* </Popover> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <InsertUserModal
                  openDialogInsert={openDialogInsert}
                  handleClose={handleCloseInsert}
                  row={selectedRow}
                />
                <DeleteUserModal
                  openDialogDelete={openDialogDelete}
                  handleClose={handleCloseDelete}
                  row={selectedRow}
                />
                <ChangeActiveUserModal
                  openDialogDelete={openDialogChangeActive}
                  handleClose={handleCloseChangeActive}
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
            rowsPerPageOptions={[10, 25, 40]}
            component="div"
            count={USERLIST.length}
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
