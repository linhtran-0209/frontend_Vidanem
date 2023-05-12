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
  
  
  const [datalist,setDataList] = useState({});
  const [posts, setPosts] = useState([]);



  
  useEffect(() => {
  const getAllPosts = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tintuc/getAll`;
      const {data}= await axios.get(url, { withCredentials: true });
      setDataList(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
    getAllPosts();
  }, []);

  
  
  return (
    <div>
      <h3 className="title__hompage__one">Thông tin trẻ em có hoàn cảnh khó khăn</h3>
      <div className="divider__hompage" />
      <div className="card">
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>
          {/* component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg" */}

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small">Xem chi tiết</Button>
          </CardActions>
        </Card>
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>
          {/* component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg" */}

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small">Xem chi tiết</Button>
          </CardActions>
        </Card>
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>
          {/* component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg" */}

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small">Xem chi tiết</Button>
          </CardActions>
        </Card>
        {/* <Card className="card__container">
          
          <CardContent sx={{ minHeight: 345 }}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="red">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card className="card__container">
          
          <CardContent sx={{ minHeight: 345 }}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="red">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card> */}
      </div>
      <h3 className="title__hompage__two">Tin bài</h3>
      <div className="divider__hompage" />
      <div className="card">
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small"  >
              Xem chi tiết
            </Button>
          </CardActions>
        </Card>
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small">Xem chi tiết</Button>
          </CardActions>
        </Card>
        <Card className="card__container">
          <CardMedia>
            <img src={img} alt="green iguana" />
          </CardMedia>

          <CardContent className="card__content">
            <h4>Lizards</h4>
            <p>
              {' '}
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </p>
          </CardContent>
          <CardActions>
            <Button size="small">Quan tâm</Button>
            <Button size="small">Xem chi tiết</Button>
          </CardActions>
        </Card>
      </div>
      {/* <Grid container spacing={3}>
          {(!datalist.length ).map((post, index) =>
            
              <Grid key={datalist.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) 
          }
        </Grid> */}
      
    </div>
  );
}