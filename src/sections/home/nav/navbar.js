import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import { bgBlur } from '../../../utils/cssStyles';
import menuItems from "./menuitem";
import * as logo from '../../../assets/images/home/header_logo_lg.png';
// import Login from 'src/pages/LoginPage';

// const pages = ['Home',  'Vì Đàn Em', 'Cộng đồng', 'Liên hệ','Bản đồ'];
// // 
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const Menu={
//   "/homepage":"Home",
//   "/homepage":'Giới thiệu',
//   "/communitypage":"Vì đàn em",
//   "/communitypage":"Cộng đồng",
//   "/contactpage": "Liên hệ",
//   "/contactpage":"Bản đồ"
// };

function ResponsiveAppBar() {
  const img = logo.default;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ background: 'rgb(255,255,255)' , boxShadow: 'none' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
            <div style={{marginRight: 250}}>
              <img style={{width: 200}} src={img} alt="ima" href="/"/>
            </div>
          

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              mr="10"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography style={{ color: '#103996' }} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          {/* <Box style={{ color: '#103996' }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , mx:'10'}}>
            {pages.map((page) => (
              <Button key={page}  onClick={handleCloseNavMenu} sx={{ my: 2, color: '#103996', display: 'block', mx:'10' }}>
                
                {page}
                
              </Button>
            ))}
          </Box> */}

          <Box style={{ color: '#103996' }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , mx:'10'}}>
            {menuItems.map((item, index) => (
              <Button key={index} href={item.url} className={item.cName} onClick={handleCloseNavMenu} sx={{ my: 2, color: '#103996', display: 'block', mx:'10' }}>
                
                {item.title}
              </Button>
            ))}
            </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" href="/login">
                    Đăng nhập
                  </Button>
                </Stack>
                
              </IconButton>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
    
  );
}
export default ResponsiveAppBar;
