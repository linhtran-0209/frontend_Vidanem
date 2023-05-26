import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import menuItems from './menuitem';
import * as logo from '../../../assets/images/home/header_logo_lg.png';

function ResponsiveAppBar() {
  const img = logo.default;

  return (
    <AppBar style={{ background: 'rgb(255,255,255)', boxShadow: 'none' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ marginRight: 250 }}>
            <Link to={'/'}>
              <img style={{ width: 200 }} src={img} alt="ima" />
            </Link>
          </div>

          <Box style={{ color: '#103996' }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx: '10' }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                href={item.url}
                className={item.cName}
                sx={{ my: 2, color: '#103996', display: 'block', mx: '10' }}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Stack direction="row" spacing={2}>
                {sessionStorage.getItem('name') ? (
                  <Button variant="contained" href="/dashboard/app">
                    Quản lý
                  </Button>
                ) : (
                  <Button variant="contained" href="/login">
                    Đăng nhập
                  </Button>
                )}
              </Stack>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
