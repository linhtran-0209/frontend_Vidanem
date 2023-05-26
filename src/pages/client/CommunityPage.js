// @mui
import { styled } from '@mui/material/styles';

import { AppBar, Toolbar } from '@mui/material';
import CongDong from '../../sections/cong-dong/cong-dong';
import { bgBlur } from '../../utils/cssStyles';
//
import Navbar from '../../sections/home/nav/navbar';

import Slider from '../../sections/home/slider/sliderHomepage';


import Contact from '../../sections/home/contact/contact';
import Footer from '../../sections/home/footer/footer';

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
export default function Communitypage() {
  return (
    <div>
      <StyledToolbar style={{ background: 'rgb(255,255,255)', position: 'sticky', top: '0px', zIndex: 10000  }}>
        <Navbar />
      </StyledToolbar>
      <Slider />
      <CongDong />
      <Contact />
      <Footer />
    </div>
  );
}
