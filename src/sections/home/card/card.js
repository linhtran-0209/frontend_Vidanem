import * as React from 'react';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
// @mui

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Grid, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { BlogPostCard } from '../../@dashboard/blog';
import * as imageOne from '../../../assets/images/home/treem.png';

export default function ImgMediaCard() {
  const navigate = useNavigate();
  const img = imageOne.default;
  const [selectedCard, setSelectedCard] = useState({});
  const [baiViet, setBaiViet] = useState({});
  const [datalist, setDataList] = useState([]);
  const [childrenlist, setChildrenList] = useState([]);
  const [listImgContent, setListImgContent] = useState([]);

  const getAllNews = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tintuc/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setDataList(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);
  const getAllChildren = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setChildrenList(data.data);
      setListImgContent(data.data.hinhAnh);
      console.log(data.data.hinhAnh);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllChildren();
  }, []);

  const handleClickDetailChildren = (event, childrenlist) => {
    setSelectedCard(childrenlist._id);
    navigate(`/children/${childrenlist._id}`);
  };
  const handleClickDetailNews = (event, datalist) => {
    setSelectedCard(datalist._id);
    navigate(`/news/${datalist._id}`);
  };

  return (
    <div>
      <h3 className="title__hompage__one">Thông tin trẻ em có hoàn cảnh khó khăn</h3>
      <div className="divider__hompage" />
      <div className="card">
        {childrenlist.map((childrenlist, index) => {
          const { _id, hoTen, truong } = childrenlist;
          return (
            <Card className="card__container">
              <CardMedia>
                
              <img src={img} alt="green iguana" />
                {/* <img src={`${process.env.REACT_APP_API_URL}${listImgContent}`} alt="green iguana" /> */}
              </CardMedia>

              <CardContent className="card__content">
                <h4 key={_id}>{hoTen}</h4>
                <span key={_id}>Gia đình hộ nghèo, có thành tích hoc tập xuất sắc  </span> {' '}
                <p className="card__p" key={_id}>Trường {truong}</p>
              </CardContent>
              <CardActions className="card__action">
                <Button className="card__button" size="small">
                  Quan tâm
                </Button>
                <Button
                  key={_id}
                  className="card__button"
                  size="small"
                  onClick={(event) => handleClickDetailChildren(event, childrenlist)}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>

      <h3 className="title__hompage__two">Tin bài</h3>
      <div className="divider__hompage" />
      <div className="card">
        {datalist.map((datalist, index) => {
          const { _id, tieuDe, moTa } = datalist;
          return (
            <Card className="card__container">
              <CardMedia>
                <img src={`${process.env.REACT_APP_API_URL}${datalist.anhTieuDe}`} alt="green iguana" />
              </CardMedia>

              <CardContent className="card__content">
                <h4 key={_id}>{tieuDe}</h4>
                <p key={_id}> {moTa}</p>
              </CardContent>
              <CardActions className="card__action">
                <Button className="card__button" size="small">
                  Quan tâm
                </Button>
                <Button
                  key={_id}
                  className="card__button"
                  size="small"
                  onClick={(event) => handleClickDetailNews(event, datalist)}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
