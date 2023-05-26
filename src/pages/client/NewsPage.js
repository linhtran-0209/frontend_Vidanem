import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import News from '../../sections/home/tinbai/ListNews'; 
import { bgBlur } from '../../utils/cssStyles';
//
import Navbar from '../../sections/home/nav/navbar';

import '../../sections/home/slider/sliderHomepage.css';
import '../../sections/cong-dong/cong-dong.css';
import Slider from '../../sections/home/slider/sliderHomepage';

import Contact from '../../sections/home/contact/contact';
import '../../sections/home/contact/contact.css';

import '../../sections/contactform/contact.css';
import Footer from '../../sections/home/footer/footer';
import '../../sections/home/footer/footer.css';

const NAV_WIDTH = 400;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 0),
  },
}));
export default function NewsPage() {
  return (
    <div>
      <StyledToolbar style={{ background: 'rgb(255,255,255)', position: 'sticky', top: '0px', zIndex: 10000  }}>
        <Navbar />
      </StyledToolbar>
      <Slider />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
