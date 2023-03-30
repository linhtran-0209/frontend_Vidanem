
import {  useState } from 'react';

import { Box, Grid, Card, Stack, Typography, FormControl, TextField,  Button } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';


export default function InsertChildren() {
  //  const { user } = useAuth();

  const [preview, setPreview] = useState(null);

  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  borderRadius: '30%',
                  objectFit: 'cover',
                  height: 200,
                }}
              />
            )}
          </div>
          <input
            accept="image/*"
            id="image-input"
            type="file"
            style={{ display: 'none' }}
            
          />
          <label
            htmlFor="image-input"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
          >
            <Button variant="contained" color="primary" component="span">
              Ảnh đại diện
            </Button>
          </label>
          {
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          }
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
      <Card sx={{ p: 3 }}>
        {/* <UserListHead  /> */}
        <div className="container__ten">
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="hoTen"
              label="Họ và tên *"
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="ngaySinh"
              label="Ngày sinh *"
              type="text"
              fullWidth
            />
          </FormControl>
        </div>
        <div className="container__diachi">
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="SDT"
              label="Số điện thoại"
              type="tel"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="diaChi"
              label="Địa chỉ *"
              type="text"
              fullWidth
            />
          </FormControl>
        </div>
        <div className="container__hoctap">
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="truong"
              label="Trường *"
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="hocTap"
              label="Học tập *"
              type="text"
              fullWidth
            />
          </FormControl>
        </div>
        <div className="container__donvi">
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="donViBaoTro"
              label="Đơn vị bảo trợ *"
              type="text"
              fullWidth
            />
          </FormControl>
          <FormControl className="formcontrol__inform" variant="standard" fullWidth>
            <TextField
              htmlFor="demo-customized-textbox"
              margin="dense"
              id="loaiBaoTro"
              label="Loại Bảo Trợ *"
              type="text"
              fullWidth
            />
          </FormControl>
        </div>
        <div className="container__hoancanh">
          <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
          
            <textarea
              id="hoanCanh"
              label="Hoàn Cảnh *"
              type="text"
              placeholder='Hoàn cảnh'
              
            />
          </FormControl>
        </div>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained">
            Thêm trẻ em
          </LoadingButton>
        </Stack>
      </Card>
    </Grid>
    </Grid>
  );
}
