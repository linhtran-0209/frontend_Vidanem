// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import * as slider from '../../../assets/images/home/Slider1.png';

// export default function sliderHomepage() {
//   const img = slider.default;
//   return (
//         <div >
//           {/* <CardMedia
//             component="img"
//             alt="green iguana"
//             height="140"
//             image="../../../assets/images/home/Slider1.png"
//           /> */}
//           <img style={{width: 1500, height: 500}} src={img} alt="ima" href="/"/>
//           {/* <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Lizard
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Lizards are a widespread group of squamate reptiles, with over 6,000
//               species, ranging across all continents except Antarctica
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Share</Button>
//             <Button size="small">Learn More</Button>
//           </CardActions> */}
//         </div>
//       );
//     }

import React from "react";
import CarouselSlider from "react-carousel-slider";

// export default function sliderHomepage() {
//   const data = [
    
//     {
//       id: "1",
//       imgSrc: "https://i.imgur.com/d5aiXJP.jpg"
//     },
//     {
//       id: "2",
//       imgSrc: "https://i.imgur.com/pgCzueK.jpg"
//     },
//     {
//       id: "3",
//       imgSrc: "https://i.imgur.com/pgCzueK.jpg"
//     },
//     {
//       id: "4",
//       imgSrc: "https://i.imgur.com/d5aiXJP.jpg"
//     },
//     {
//       id: "5",
//       imgSrc: "https://i.imgur.com/pgCzueK.jpg"
//     }
    
//   ];
//   const manner = {
//     autoSliding: { interval: "2s" }
//   };
//   const buttonSetting = {
//     placeOn: "bottom-beneath",
    
//     style: {
//       left: {
//         margin: "0px 0px 0px 10px"
//       },
//       right: {
//         margin: "0px 10px 0px 0px"
//       }
//     }
//   };
//   const itemsStyle = {
//     margin: "0px 0px",
//     padding: "0px"
//   };
//   return (
//     <div className="CarouselSlider">
//       <CarouselSlider
//         slideItems={data}
//         manner={manner}
//         buttonSetting={buttonSetting}
//         itemsStyle={itemsStyle}
//       />
//     </div>
//   );
// }

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function SliderHomepage()  {
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div>
        {/* <h2 className={styles.heading}> Single Item</h2> */}
        <div className="divider" />
        <Slider {...settings}>
          <div className="slider_one">
          {/* <img style={{width: 1500, height: 500}} src={img} alt="ima" href="/"/> */}
          </div>
          <div className="slider_two">
            {/* <img style={{width: 1500, height: 500}} src={img} alt="ima" href="/"/> */}
          </div>
          <div className="slider_three">
            {/* <img style={{width: 1500, height: 500}} src={img} alt="ima" href="/"/> */}
          </div>
          
        </Slider>
      </div>
    );
  }
