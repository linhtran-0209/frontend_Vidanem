import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import CongDong from '../../sections/cong-dong/cong-dong';
import { bgBlur } from '../../utils/cssStyles';
//
import Navbar from '../../sections/home/nav/navbar';

import Slider from '../../sections/home/slider/sliderHomepage';
import { StyleSlider } from '../../sections/home/slider/sliderHomepage.css';


import Contact from '../../sections/home/contact/contact';
import { StyleContact } from '../../sections/home/contact/contact.css';
import Footer from '../../sections/home/footer/footer';
import { StyleFooter } from '../../sections/home/footer/footer.css';

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
export default function Communitypage() {
  return (
    <>
      <StyledToolbar style={{ background: 'rgb(255,255,255)' }}>
        <Navbar />
      </StyledToolbar>
      <Slider />
      {/* <Carousel /> */}
      <CongDong />
      <Contact />
      <Footer />
    </>
  );
}
