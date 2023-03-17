import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export function EditModal(props) {
  const [SPONSER, setSPONSER] = useState({});

  useEffect(() => {
    if (props.id) {
      getSponser();
    }
  }, [props.id]);

  const getSponser = async () => {
    try {
      const url = `http://localhost:5000/api/v1/sponsor/byId?id=${props.id._id}`;
      const { data } = await axios.get(url, { withCredentials: true })
      setSPONSER(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    // console.log(SPONSER.maDonVi);
    try {
      const url = `http://localhost:5000/api/v1/sponsor/update`;

      axios.put(
        url,
        {
          id: SPONSER._id,
        //   maDonVi: SPONSER.maDonVi,
          tenDonVi: SPONSER.tenDonVi,
          SDT: SPONSER.SDT,
          tongSoLuong: SPONSER.tongSoLuong,
          tongSoTien: SPONSER.tongSoTien,
          moTa: SPONSER.moTa,
        },
        { withCredentials: true }
      )
      // props.handleClose()

    } catch (err) {
      console.log(err)
    }
  };

  return (

<Dialog open={props.setOpenDialogEdit} onClose={props.handleClose}>
      <DialogTitle>Cập nhật nhà tài trợ</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Mã đơn vị"
          onChange={(e) => setSPONSER({ ...SPONSER, maDonVi: e.target.value })}
          value={SPONSER.maDonVi || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tên đơn vị tài trợ"
          onChange={(e) => setSPONSER({ ...SPONSER, tenDonVi: e.target.value })}
          value={SPONSER.tenDonVi || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Số điện thoại"
          onChange={(e) => setSPONSER({ ...SPONSER, SDT: e.target.value })}
          value={SPONSER.SDT || ''}
          type="phone"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_luong"
          label="Tổng số lượng"
          onChange={(e) => setSPONSER({ ...SPONSER, tongSoLuong: e.target.value })}
          value={SPONSER.tongSoLuong || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="tong_so_tien"
          label="Tổng số tiền"
          onChange={(e) => setSPONSER({ ...SPONSER, tongSoTien: e.target.value })}
          value={SPONSER.tongSoTien || ''}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="mo_ta"
          label="Mô tả"
          onChange={(e) => setSPONSER({ ...SPONSER, moTa: e.target.value })}
          value={SPONSER.moTa || ''}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Cập nhật nhà tài trợ</Button>
      </DialogActions>
    </Dialog>
  );
}