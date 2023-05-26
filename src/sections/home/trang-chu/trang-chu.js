import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Slider from 'react-slick';
import Marquee from 'react-fast-marquee';
import ShowMoreText from 'react-show-more-text';

// @mui

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { BlogPostCard } from '../../@dashboard/blog';
import { TreEmDialog } from '../../children/tre-em-dialog';

export default function ImgMediaCard() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [selectedTreEm, setSelectedTreEm] = useState();
  const [baiVietList, setBaiVietList] = useState([]);
  const [chuDeList, setChuDeList] = useState([]);
  const [childrenlist, setChildrenList] = useState([]);
  const [openDialogTreEm, setOpenDialogTreEm] = useState(false);

  const getAllNews = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tintuc/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setBaiVietList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllChuDe = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/chude/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setChuDeList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllChuDe();
  }, []);

  useEffect(() => {
    getAllNews();
  }, []);

  const getAllChildren = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/treem/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setChildrenList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllChildren();
  }, []);

  const handleClickDetailChildren = (id) => {
    setSelectedTreEm(id);
    setOpenDialogTreEm(true);
  };

  const handleCloseDialogTreEm = () => {
    setOpenDialogTreEm(false);
  };
  return (
    <div>
      <h3 className="title__hompage__one">Trẻ em</h3>
      <div className="divider__hompage" />
      <div style={{ marginTop: '30px', textAlign: 'center', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Slider {...settings}>
          {childrenlist.map((children) => {
            const { _id, hoTen, ngaySinh, hinhAnh, truong, hoanCanh } = children;

            return (
              <Card
                sx={{
                  maxWidth: 345,
                  height: 450,
                  '&:hover': {
                    border: '1px solid black',
                  },
                }}
              >
                <CardHeader
                  style={{ textAlign: 'center' }}
                  title={`${hoTen} - ${moment(ngaySinh).format('DD/MM/YYYY')}`}
                  subheader={truong}
                />
                <CardMedia component="img" height="194" image={hinhAnh[0].url} alt="Paella dish" />
                <CardContent
                  style={{ textAlign: 'justify', height: 131, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {hoanCanh}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing style={{ justifyContent: 'center' }}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="show detail" onClick={(e) => handleClickDetailChildren(_id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </Slider>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to={'/tre-em'}>
            <Typography variant="subtitle2" noWrap>
              Xem thêm
            </Typography>
          </Link>
        </div>
      </div>
      {openDialogTreEm && (
        <div style={{zIndex: 20000}}>
          {' '}
          <TreEmDialog openDialog={openDialogTreEm} _id={selectedTreEm} handleClose={handleCloseDialogTreEm} />
        </div>
      )}

      <h3 className="title__hompage__two">Tin mới</h3>
      <div className="divider__hompage" />

      <div style={{ marginTop: '20px', width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Marquee direction="left" speed={100} pauseOnClick gradient>
          {chuDeList.map((item, index) => (
            <div>
              <img
                style={{ width: '150px', height: '100px' }}
                key={index}
                src={`${process.env.REACT_APP_API_URL}${item.hinhAnh}`}
                alt=""
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div style={{ marginTop: '20px', width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Slider {...settings}>
          {baiVietList.map((data, index) => {
            return <BlogPostCard post={data} index={index} trangchu="true" />;
          })}
        </Slider>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to={'/news'}>
            <Typography variant="subtitle2" noWrap>
              Xem thêm
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
