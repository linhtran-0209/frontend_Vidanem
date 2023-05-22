import axios from 'axios';
import parse from 'html-react-parser';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import { bgBlur } from '../../../utils/cssStyles';
//
import Navbar from '../nav/navbar';

export default function DetailNews() {
  const [baiViet, setBaiViet] = useState({});

  const [preview, setPreview] = useState(null);
  const [imgCover, setImgCover] = useState(null);
  const [content, setContent] = useState(null);
  const [listImgContent, setListImgContent] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getTinTuc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/tintuc/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setBaiViet(data.data);
    console.log(data.data.anhTieuDe, data.data);

    setPreview(`${process.env.REACT_APP_API_URL}${data.data.anhTieuDe}`);
    setContent(data.data.noiDung);
    if (data.data.noiDung) {
      setContent(parse(data.data.noiDung));
    }
  };

  useEffect(() => {
    getTinTuc();
  }, []);

  const handleListImg = (imgPath) => {
    if (content.includes(imgPath)) {
      setListImgContent([...listImgContent, imgPath]);
    }
  };
  const NAV_WIDTH = 400;

  const HEADER_MOBILE = 64;

  const HEADER_DESKTOP = 92;

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.grey[100] }),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% )`,
    },
  }));
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 0),
    },
  }));

  return (
    <>
      <StyledToolbar style={{ background: 'rgb(255,255,255)' }}>
        <Navbar />
      </StyledToolbar>

      <div className="previewBlog">
        {baiViet.tieuDe && <h2>{baiViet.tieuDe}</h2>}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '100%',
              objectFit: 'cover',
              height: '30%',
            }}
          />
        )}

        {baiViet.moTa && <p>{baiViet.moTa}</p>}
        {baiViet.noiDung && <div className="image-container">{content}</div>}
      </div>

      {/* <DialogActions>
        <Button onClick={props.onClose}>Đóng</Button>
      </DialogActions> */}
    </>
  );
}
