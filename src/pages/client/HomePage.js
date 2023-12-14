import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
//
import Navbar from '../../sections/home/nav/navbar';

import Slider from '../../sections/home/slider/sliderHomepage';
import '../../sections/home/slider/sliderHomepage.css';
import HomePage from '../../sections/home/trang-chu/trang-chu';
import '../../sections/home/trang-chu/trang-chu.css';
import '../../sections/home/tinbai/detail-new.css';
import Couter from '../../sections/home/count/count';
import '../../sections/home/count/count.css';
import Contact from '../../sections/home/contact/contact';
import '../../sections/home/contact/contact.css';
import Footer from '../../sections/home/footer/footer';
import '../../sections/home/footer/footer.css';

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 0),
  },
}));
export default function Homepage() {
  return (
    <div>
      <StyledToolbar style={{ background: 'rgb(255,255,255)', position: 'sticky', top: '0px', zIndex: 10000 }}>
        <Navbar />
      </StyledToolbar>
      <Slider />
      <HomePage />
      <Couter />
      <Contact />
      <Footer />
    </div>
  );
}
