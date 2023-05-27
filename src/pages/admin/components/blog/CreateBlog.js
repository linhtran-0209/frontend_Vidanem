import { useEffect, useState } from 'react';
import axios from 'axios';
// form
import 'react-quill/dist/quill.snow.css';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Alert, Grid, Card, InputLabel, Stack, Button, TextField, Typography, Select, MenuItem } from '@mui/material';

// components
//
import BlogNewPostPreview from './PreviewNewBlog';
import Editor from './Editor';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const [baiViet, setBaiViet] = useState({});
  const [listTitle, setListTitle] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgCover, setImgCover] = useState(null);
  const [content, setContent] = useState('');
  const [listImgContent, setListImgContent] = useState([]);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [textFieldTieuDeError, setTextFieldTieuDeError] = useState(false);
  const [textFieldMoTaError, setTextFieldMoTaError] = useState(false);
  const [textNoiDungError, setTextNoiDungError] = useState(false);
  const [selectChuDeError, setSelectChuDeError] = useState(false);

  const handleOpenPreview = () => {
    setBaiViet({ ...baiViet, anhTieuDe: preview });
    setOpen(true);
  };

  const getListTitle = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/chude/getAll?all=true`;
    const { data } = await axios.get(url, { withCredentials: true });
    setListTitle(data.data);
  };

  useEffect(() => {
    getListTitle();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setBaiViet({ ...baiViet, chuDe: e.target.value });
    setSelectChuDeError(false);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreview(preview);
      setBaiViet({ ...baiViet, imgCoverPreview: preview });
      setImgCover(file);
    }
    setImageError(false);
  };

  const handleContentChange = (value) => {
    setContent(value);
    setBaiViet({ ...baiViet, noiDung: value });
    setTextNoiDungError(false);
  };

  const handleListImg = (imgPath) => {
    if (content.includes(imgPath)) {
      setListImgContent([...listImgContent, imgPath]);
    }
  };

  const handleSubmit = async () => {
    if (!imgCover) {
      setImageError(true);
    } else setImageError(false);
    if (!baiViet.tieuDe) {
      setTextFieldTieuDeError(true);
    } else setTextFieldTieuDeError(false);
    if (!baiViet.moTa) {
      setTextFieldMoTaError(true);
    } else setTextFieldMoTaError(false);
    if (!content) {
      setTextNoiDungError(true);
    } else setTextNoiDungError(false);
    if (!selected) {
      setSelectChuDeError(true);
    } else setSelectChuDeError(false);

    if (imgCover && selected && baiViet.tieuDe && baiViet.moTa && content) {
      const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/insert`;
      const formData = new FormData();
      formData.append('image', imgCover);
      formData.append('chuDe', selected);
      formData.append('tieuDe', baiViet.tieuDe);
      formData.append('moTa', baiViet.moTa);
      formData.append('noiDung', content);
      const result = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (result.data.id) {
        const urlMove = `${process.env.REACT_APP_API_URL}/admin/tintuc/move`;
        if (listImgContent.length > 0) {
          listImgContent.forEach(async (img) => {
            await axios.put(
              urlMove,
              {
                source: img,
              },
              { withCredentials: true }
            );
          });
        }
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
      }
    }
    // props.handleClose();
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 30, top: 60 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 30, top: 60 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                name="title"
                label="Tiêu đề"
                onChange={(e) => {
                  setBaiViet({ ...baiViet, tieuDe: e.target.value });
                  setTextFieldTieuDeError(false);
                }}
                error={textFieldTieuDeError}
                helperText={textFieldTieuDeError && 'Vui lòng nhập tiêu đề'}
              />
              <div className="cover">
                <LabelStyle>Hình ảnh</LabelStyle>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        // maxWidth: '100%',
                        width: '100%',
                        // borderRadius: '30%',
                        objectFit: 'cover',
                        height: 300,
                      }}
                    />
                  )}
                </div>
                <input
                  accept="image/*"
                  id="image-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                {imageError && (
                  <Typography component="span" variant="body2" style={{ textAlign: 'center', color: 'red' }}>
                    <p>Vui lòng chọn ảnh cho tiêu đề</p>
                  </Typography>
                )}
                <label
                  htmlFor="image-input"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
                >
                  <Button variant="contained" color="primary" component="span">
                    Hình ảnh
                  </Button>
                </label>
              </div>
              <TextField
                name="description"
                label="Mô tả"
                multiline
                rows={3}
                onChange={(e) => {
                  setBaiViet({ ...baiViet, moTa: e.target.value });
                  setTextFieldMoTaError(false);
                }}
                error={textFieldMoTaError}
                helperText={textFieldMoTaError && 'Vui lòng nhập mô tả'}
              />

              <div>
                <LabelStyle>Nội dung</LabelStyle>
                <Editor
                  theme="snow"
                  value={content}
                  onChange={handleContentChange}
                  handleImg={handleListImg}
                  error={textNoiDungError}
                />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <InputLabel id="demo-simple-select-standard-label">Chủ đề</InputLabel>
              <Select
                onChange={handleChange}
                value={selected}
                fullWidth
                margin="dense"
                style={{ border: selectChuDeError ? '1px solid red' : '' }}
              >
                {listTitle.map((option) => (
                  <MenuItem key={option._id} value={option._id} label={option.tenChuDe}>
                    {option.tenChuDe}
                  </MenuItem>
                ))}
              </Select>
              {selectChuDeError && (
                <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn chủ đề</div>
              )}
              <TextField
                name="metaTitle"
                label="Người đăng bài"
                value={sessionStorage.getItem('name') || ''}
                disabled
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
              Xem trước
            </Button>
            <LoadingButton fullWidth type="submit" variant="contained" size="large" onClick={handleSubmit}>
              Đăng
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <BlogNewPostPreview isOpen={open} baiViet={baiViet} onClose={handleClosePreview} />
    </>
  );
}
