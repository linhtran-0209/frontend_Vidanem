import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as imageOne from '../../../assets/images/home/treem.png';

export default function ImgMediaCard() {
  const img = imageOne.default;
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
    </div>
  );
}
