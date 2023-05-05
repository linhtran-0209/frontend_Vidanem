import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import { Image } from 'mui-image';
import { userReducer } from '../../../reducer/useReducer';
// mock
// import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
// import logo from '../../../assets/images/home/header_logo_lg.png';
import * as logo from '../../../assets/images/home/header_logo_lg.png';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  width: 280,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(null);
  const img = logo.default;

  useEffect(() => {
    setTimeout(() => {
      setUser(sessionStorage.getItem('name'));
      setAvatar(sessionStorage.getItem('avatar'));
      setRole(+sessionStorage.getItem('role'));
    }, 1000);
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <div style={{ margin: 10 }}>
        <img src={img} alt="ima" />
      </div>

      <Box sx={{ mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={avatar} alt="avatar" />

            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {role === 3 ? 'Cấp Liên Đội' : (role === 2 ? 'Hội đồng Đội quận, huyện' : (role ===1 ? 'Hội đồng Đội Thành phố' : '')) }
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection sx={{ m: 1.8 }} data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        {/* <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack> */}
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
