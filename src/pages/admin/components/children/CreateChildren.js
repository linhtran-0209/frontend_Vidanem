import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Card,
  Stack,
  Typography,
  FormControl,
  TextField,
  Button,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import 'react-multi-carousel/lib/styles.css';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';

export default function InsertChildren() {
  const [preview, setPreview] = useState([]);
  const [search, setSearch] = useState('');
  const [SPONSERLIST, setSPONSERLIST] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getSponsorList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
    const { data } = await axios.get(url, { withCredentials: true });
    setSPONSERLIST(data.data);
  };
  useEffect(() => {
    getSponsorList();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;
    const selectedImages = [];

    // Kiểm tra số lượng ảnh đã chọn
    if (selectedFiles.length <= 4) {
      for (let i = 0; i < selectedFiles.length; i += 1) {
        const file = selectedFiles[i];
        const imageUrl = URL.createObjectURL(file);
        selectedImages.push(imageUrl);
      }
      setPreview(selectedImages);
    } else {
      alert('Bạn chỉ được chọn tối đa 4 ảnh!');
    }
  };

  return (
    <div className='maincontainer'>
      <Typography className="typography" variant="h4" gutterBottom>
        Thêm trẻ em mới
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {preview && (
                <img
                  src={preview[selectedImageIndex]}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    objectFit: 'cover',
                    height: 200,
                    // border: '2px solid Silver',
                  }}
                />
              )}
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              <Grid container spacing={2} columns={16}>
                {preview.length > 0 &&
                  preview.map((image, index) => (
                    <Grid key={index} item xs={4}>
                      <Card sx={{ p: 0.5 }} onClick={() => setSelectedImageIndex(index)}>
                        <img
                          src={image}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            borderRadius: '5%',
                            objectFit: 'cover',
                            height: 60,
                            border: '2px solid Silver',
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              style={{ display: 'none' }}
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="image-input"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
            >
              <Button variant="contained" color="primary" component="span">
                Ảnh đại diện
              </Button>
            </label>
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
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ overflow: 'hidden' }}>
          <Card sx={{ p: 3 }}>
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
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <TextField id="hoanCanh" label="Địa chỉ *" type="text" placeholder="Địa chỉ" />
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
                  label="Trường *"
                  type="text"
                  fullWidth
                />
              </FormControl>
            </div>

            <div className="container__hoctap">
              <FormControl className="formcontrol__inform" variant="outlined" fullWidth>
                {/* <TextField
                htmlFor="demo-customized-textbox"
                margin="dense"
                id="truong"
                label="Đơn vị bảo trợ *"
                type="text"
                fullWidth
              /> */}
                <div>
                  <InputLabel id="demo-simple-select-standard-label">Đơn vị tài trợ</InputLabel>
                  <Select onChange={handleChange} label="Đơn vị tài trợ" value={selected} fullWidth margin="dense">
                    <TextField
                      placeholder="Tên đơn vị tài trợ..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      fullWidth
                      inputProps={{
                        autoComplete: 'off',
                      }}
                    />

                    {SPONSERLIST.filter((option) => option.tenDonVi.toLowerCase().includes(search)).map((option) => (
                      <MenuItem key={option._id} value={option} label={option.tenDonVi}>
                        {option.tenDonVi}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hocTap"
                  label="Học bổng *"
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
                  label="Năm nhận *"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="loaiBaoTro"
                  label="Năm hoàn thành *"
                  type="text"
                  fullWidth
                />
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <textarea id="hoanCanh" label="Hoàn Cảnh *" type="text" placeholder="Hoàn cảnh" />
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                  <b>Học tập</b>
                </label>
                {/* <Card
                variant="outlined"
                orientation="horizontal"
                sx={{
                  width: '95%',
                  '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
              >
                <h3 style={{ marginLeft: 20 }}>Học kỳ 1 - Năm 2022-2023</h3>
                <p style={{ marginLeft: 40 }}>Học Lực: Giỏi</p>
                <h4 style={{ marginLeft: 20 }}>Thành tích</h4>
                <div style={{ marginLeft: 40, marginBottom: 10 }}>
                  <li>dhdfshdf</li>
                  <li>dshsdhbds</li>
                  <li>sdhsdghdsg</li>
                </div>
              </Card> */}
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
    </div>
  );
}
