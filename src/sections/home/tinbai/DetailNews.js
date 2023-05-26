import axios from 'axios';
import parse from 'html-react-parser';
// components
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton, Grid, Card, Typography, Tooltip, Link } from '@mui/material';
import { CommentList } from './CommentList';
import { bgBlur } from '../../../utils/cssStyles';
//
import Navbar from '../nav/navbar';

export default function DetailNews() {
  const [baiViet, setBaiViet] = useState({});
  const [comments, setComments] = useState([]);

  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState(null);
  const [baiVietList, setBaiVietList] = useState([]);

  const { id } = useParams();

  const getTinTuc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/tintuc/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setBaiViet(data.data);
    setPreview(`${process.env.REACT_APP_API_URL}${data.data.anhTieuDe}`);
    setContent(data.data.noiDung);
    if (data.data.noiDung) {
      setContent(parse(data.data.noiDung));
    }
    getAllNews(data.data.chuDe._id);
    getBinhLuan(id);
  };

  const getBinhLuan = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/binhluan/getAllByTinTuc?baiViet=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setComments(data.data);
  };

  useEffect(() => {
    getTinTuc();
  }, []);

  const HEADER_MOBILE = 64;

  const HEADER_DESKTOP = 92;

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 0),
    },
  }));

  const getAllNews = async (idChuDe) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tintuc/getRelate?chuDe=${idChuDe}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setBaiVietList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StyledToolbar style={{ background: 'rgb(255,255,255)' }}>
        <Navbar />
      </StyledToolbar>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          {''}
        </Grid>
        <Grid item xs={8}>
          <div className="grid-noi-dung">
            <h2>{baiViet?.tieuDe}</h2>

            {baiViet?.anhTieuDe && (
              <img
                src={`${process.env.REACT_APP_API_URL}${baiViet?.anhTieuDe}`}
                alt="Preview"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '30%',
                }}
              />
            )}

            <p>{baiViet?.moTa}</p>
            {baiViet.noiDung && <div className="noi-dung">{content}</div>}
          </div>
          <div style={{ width: '100%', margin: '60px 0', height: 1, background: 'gray' }} />

          <CommentList baiViet={baiViet._id} comments={comments} />
        </Grid>
        <Grid item xs={3}>
          <div style={{ position: 'sticky', top: '10px' }}>
            <h3 style={{ marginTop: '20px' }}>Tin tương tự</h3>
            {baiVietList.map((baiviet, index) => {
              return (
                <>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 2, width: '95%', background: 'none' }}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}${baiviet.anhTieuDe}`}
                      alt=""
                      style={{ width: 90, height: 90 }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                      <a href={`/news/${baiviet._id}`}>
                        {' '}
                        {baiviet.tieuDe.length > 70 ? `${baiviet.tieuDe.slice(0, 70)}...` : baiviet.tieuDe}{' '}
                      </a>
                    </Box>
                  </Card>
                  <div style={{ width: '100%', margin: 0, height: 1, background: 'gray' }} />
                </>
              );
              // <img src={`${process.env.REACT_APP_API_URL}${baiviet.anhTieuDe}`} alt=''/>
            })}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
