import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// form
import 'react-quill/dist/quill.snow.css';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, InputLabel, Stack, Button, TextField, Typography, Select, MenuItem, Alert } from '@mui/material';

// components
//
import BlogNewPostPreview from './PreviewNewBlog';
import Editor from './Editor';
import { DialogReasonReject } from './DialogReasonReject';

// ----------------------------------------------------------------------

const TAGS_OPTION = ['Đỗ Minh Quân', 'Admin', 'Trần Thị Khánh Linh'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [baiViet, setBaiViet] = useState({});
  const [nguoiTao, setNguoiTao] = useState('');
  const [nguoiDuyet, setNguoiDuyet] = useState('');
  const [listTitle, setListTitle] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgCover, setImgCover] = useState(null);
  const [content, setContent] = useState('');
  const [listImgContent, setListImgContent] = useState([]);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [openDialogReasonReject, setOpenDialogReasonReject] = useState(false);

  const handleOpenPreview = () => {
    setBaiViet({ ...baiViet, anhTieuDe: preview, noiDung: content });
    setOpen(true);
  };

  const getTinTuc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setBaiViet(data.data);
    console.log(data.data);
    setNguoiTao(data.data.nguoiTao.hoTen);
    setPreview(`${process.env.REACT_APP_API_URL}${data.data.anhTieuDe}`);
    setContent(data.data.noiDung);
    setSelected(data.data.chuDe._id);
    if (data.data.nguoiDuyet) setNguoiDuyet(data.data.nguoiDuyet.hoTen);
    console.log(data.data.authStatus);
  };

  useEffect(() => {
    getTinTuc();
  }, []);

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
  };

  const handleClosePreview = () => {
    setOpen(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreview(preview);
      setBaiViet({ ...baiViet, anhTieuDe: preview });
      setImgCover(file);
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    console.log(value);
    // setBaiViet({ ...baiViet, noiDung: value });
  };

  const handleListImg = (imgPath) => {
    if (content.includes(imgPath)) {
      setListImgContent([...listImgContent, imgPath]);
    }
  };

  const handleSubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/update`;
    const formData = new FormData();
    formData.append('id', baiViet._id);
    formData.append('image', imgCover);
    formData.append('chuDe', selected);
    formData.append('tieuDe', baiViet.tieuDe);
    formData.append('moTa', baiViet.moTa);
    formData.append('noiDung', content);
    const result = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

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

    // props.handleClose();
  };

  const handleAccept = async () => {
    if (+sessionStorage.getItem('role') === 1) {
      const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/accpet`;
      await axios
        .put(
          url,
          {
            id: baiViet._id,
          },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.status === 200) {
            setOpenSuccessMessage(result.data.message);
          } else setOpenErrMessage(result.data.message);
        });
      setBaiViet({ ...baiViet, authStatus: 'DaDuyet' });
    } else setOpenErrMessage('Không thể thực hiện chức năng này');
  };

  const handleReject = async (reason) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/tintuc/reject`;
    await axios
      .put(
        url,
        {
          id: baiViet._id,
          reasonReject: reason,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
        setBaiViet({ ...baiViet, authStatus: 'TuChoi' });
      });
  };

  const handleCloseDialogReason = () => {
    setOpenDialogReasonReject(false);
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
                value={baiViet.tieuDe || ''}
                label="Tiêu đề"
                onChange={(e) => setBaiViet({ ...baiViet, tieuDe: e.target.value })}
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
                value={baiViet.moTa || ''}
                multiline
                rows={3}
                onChange={(e) => setBaiViet({ ...baiViet, moTa: e.target.value })}
              />

              <div>
                <LabelStyle>Content</LabelStyle>
                <Editor theme="snow" value={content} onChange={handleContentChange} handleImg={handleListImg} />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {baiViet.authStatus === 'TuChoi' && (
                <>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: 20 }}>❌ Từ chối</p>{' '}
                  </div>
                  {baiViet.authStatus === 'TuChoi' && (
                    <>
                      <p style={{ backgroundColor: '#FF6A6A', color: 'white', paddingLeft: 5, fontSize: 15 }}>
                        <b>
                          {' '}
                          <u>Lí do từ chối:</u>{' '}
                        </b>{' '}
                        {baiViet.reasonReject}
                      </p>
                    </>
                  )}
                </>
              )}

              {baiViet.authStatus === 'DaDuyet' && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'green', fontSize: 20 }}>✔ Đã Duyệt</p>
                </div>
              )}
              <InputLabel id="demo-simple-select-standard-label">Chủ đề</InputLabel>
              <Select onChange={handleChange} value={selected} fullWidth margin="dense">
                {listTitle.map((option) => (
                  <MenuItem key={option._id} value={option._id} label={option.tenChuDe}>
                    {option.tenChuDe}
                  </MenuItem>
                ))}
              </Select>

              <TextField name="metaTitle" label="Người đăng bài" value={nguoiTao || ''} disabled />
              {nguoiDuyet && <TextField name="metaTitle" label="Người đăng bài" value={nguoiDuyet || ''} disabled />}
            </Stack>
          </Card>
          <DialogReasonReject
            openDialog={openDialogReasonReject}
            handleReject={handleReject}
            handleClose={handleCloseDialogReason}
          />

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
              Xem trước
            </Button>
            {+sessionStorage.getItem('role') === 2 && baiViet.authStatus !== 'DaDuyet' && (
              <LoadingButton fullWidth type="submit" variant="contained" size="large" onClick={handleSubmit}>
                Cập nhật
              </LoadingButton>
            )}
          </Stack>
          {+sessionStorage.getItem('role') === 2 && baiViet.authStatus === 'DaDuyet' && (
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth color="error" variant="outlined" size="large">
                Gửi yêu cầu chỉnh sửa
              </Button>
            </Stack>
          )}
          {+sessionStorage.getItem('role') === 1 && baiViet.authStatus === 'ChoDuyet' && (
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="error"
                variant="outlined"
                size="large"
                onClick={(e) => {
                  setOpenDialogReasonReject(true);
                }}
              >
                Từ chối
              </Button>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" onClick={handleAccept}>
                Duyệt
              </LoadingButton>
            </Stack>
          )}
        </Grid>
      </Grid>

      <BlogNewPostPreview isOpen={open} baiViet={baiViet} onClose={handleClosePreview} />
    </>
  );
}
