import orderBy from 'lodash/orderBy';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
// sections
import { BlogPostCard } from '../../@dashboard/blog';
import NewsToolbar from './NewsToolbar';

// ----------------------------------------------------------------------

export default function ListNews() {
  const [listNews, setListNews] = useState([]);

  const getAllNews = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tintuc/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setListNews(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <>
      <NewsToolbar />
      <Container>
        <Grid container spacing={3}>
          {listNews.map((news, index) => (
            <Grid key={index} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
              <BlogPostCard post={news} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
