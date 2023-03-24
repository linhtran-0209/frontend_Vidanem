import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';

// @mui
import {
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
  MenuItem,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { EditModal } from './admin/components/sponsor/EditModal';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import { CreateModal } from './admin/components/sponsor/CreateModal';
import { DeleteSponsorModal } from './admin/components/sponsor/DeleteSponsorModal';
import SponserToolbar from '../sections/@dashboard/sponsers/SponserToolbar';

// mock
// import USERLIST from '../_mock/us
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'logo', label: 'Logo', alignRight: false },
  { id: 'ma_don_vi', label: 'Mã đơn vị', alignRight: false },
  { id: 'name', label: 'Tên đơn vị', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'so_luong_da_trao', label: 'Đã trao', alignRight: false },
  { id: 'action', label: 'Hành động', alignRight: false },
];

// ----------------------------------------------------------------------

export default function SponserPage() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [openSponsorCreate, setOpenSponsorCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  useEffect(() => {
    getSponser();
  }, []);

  const getSponser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
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

  const handleCloseEdit = async () => {
    setOpenDialogEdit(false);

    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?keyword=${filterName}&curPage=${page}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage - 1);
    try {
      const url = `http://localhost:5000/api/v1/sponsor/getAll?keyword=${filterName}&curPage=${newPage}&perPage=${rowsPerPage}`;
      const { data } = await axios.get(url, { withCredentials: true });
      // const  parse=data.data.email;
      setSPONSERLIST(data.data);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialogDelete(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const isNotFound = !SPONSERLIST.length && !!filterName;

  const handleRowClick = (event, row) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
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
          <Button
            // className="buttonThemMoi"
            className="buttonthemdonvi"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpenCreate}
          >
            Thêm mới
          </Button>
        </Stack>
        <CreateModal openDialogCreate={openSponsorCreate} handleClose={handleCloseCreate} />
        <Card>
          <SponserToolbar filterName={filterName} onFilterName={handleFilterByName} onClickSearch={handleSearch} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={total} />
                <TableBody>
                  {SPONSERLIST.map((row) => {
                    const { _id, logo, maDonVi, tenDonVi, SDT, soLuongDaTrao } = row;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        onDoubleClick={(event) => handleRowClick(event, row)}
                        sx={{ cursor: 'pointer', width: '200px', height: '60px' }}
                      >
                        <TableCell align="center">
                          <img src={logo} alt="Logo" width="40" height="40" />
                        </TableCell>

                        <TableCell align="left">{maDonVi}</TableCell>

                        <TableCell align="left">{tenDonVi}</TableCell>

                        <TableCell align="left">{SDT}</TableCell>

                        <TableCell align="left">{soLuongDaTrao}</TableCell>

                        <TableCell
                          className="coliconsponser"
                          // style={{ height: 40, display: 'inline-flex', padding: 0, borderBottom: '0', marginTop: 8 }}
                          // align="center"
                        >
                          <MenuItem className="updatesponser" onClick={(event) => handleRowClick(event, row)}>
                            <Iconify style={{ color: 'green' }} icon={'eva:edit-2-outline'} />
                          </MenuItem>

                          <MenuItem
                            className="deletesponser"
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

                <EditModal setOpenDialogEdit={openDialogEdit} handleClose={handleCloseEdit} row={selectedRow} />

                <DeleteSponsorModal
                  openDialogDelete={openDialogDelete}
                  handleClose={handleCloseDelete}
                  row={selectedRow}
                />
                {/* <EditModal
                  setOpenDialogEdit={openDialogEdit}
                  handleClose={handleCloseEdit}
                  id={selectedRow}
                /> */}

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
