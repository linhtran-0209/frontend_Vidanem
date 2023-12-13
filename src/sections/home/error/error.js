import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import menuItems from '../nav/menuitem';

import { bgBlur } from '../../../utils/cssStyles';
//
import Navbar from '../nav/navbar';

// import Carousel from '../../sections/home/carousel/carousel'
// import {StyleCarousel} from'../../sections/home/carousel/carousel.css';
import HomePage from '../trang-chu/trang-chu';
import '../trang-chu/trang-chu.css';

import Contact from '../contact/contact';
import '../contact/contact.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import './error.css';
import * as logo from '../../../assets/images/home/logo.png';

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
export default function ErrorPage() {
  const img = logo.default;
  return (
    <div>
      <StyledToolbar style={{ background: 'rgb(255,255,255)', position: 'sticky', top: '0px', zIndex: 10000 }}>
        <AppBar style={{ background: 'rgb(255,255,255)', boxShadow: 'none' }} position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <div>
                <Link to={'/'}>
                  <img style={{ width: 200 }} src={img} alt="ima" />
                </Link>
              </div>

              <Box
                style={{ color: '#103996', marginLeft: 480 }}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
              >
                {menuItems.map((item, index) => (
                  <Button
                    style={{ paddingLeft: 12, paddingRight: 12 }}
                    key={index}
                    href={item.url}
                    className={item.cName}
                    sx={{ my: 2, color: '#103996', display: 'block' }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </StyledToolbar>
      <div>
        <div className="error">
          <ErrorOutlinedIcon className="iconerror" />
          <h3>Đăng nhập không thành công</h3>
          <p>Email chưa được cấp quyền đăng nhập, liên hệ người quản trị để được cấp quyền</p>
          <Button variant="contained" href="/homepage">
            Quay trở về trang chủ
          </Button>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
