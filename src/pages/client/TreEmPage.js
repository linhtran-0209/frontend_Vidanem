// @mui
import { styled } from '@mui/material/styles';

import { Toolbar } from '@mui/material';
import TreEm from '../../sections/children/tre-em'; 
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

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 0),
  },
}));
export default function TreEmpage() {
  return (
    <div>
      <StyledToolbar style={{ background: 'rgb(255,255,255)',}}>
        <Navbar />
      </StyledToolbar>
      <Slider />
      <TreEm />
      <Contact />
      <Footer />
    </div>
  );
}
