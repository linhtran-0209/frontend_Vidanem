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
import * as logo from '../../../assets/images/home/logo.png';

function ResponsiveAppBar() {
  const img = logo.default;

  return (
    <AppBar style={{ background: 'rgb(255,255,255)', boxShadow: 'none' }} position="static">
      <Container maxWidth="xl">
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={img} className="w-60" alt="Logo" />
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {sessionStorage.getItem('name') ? (
                  <Button  variant="contained" href="/dashboard/app">
                    Quản lý
                  </Button>
                ) : (
                  <Button variant="contained" href="/login">
                    Đăng nhập
                  </Button>
                )}
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <Box className='text-sky-600 ml-auto mr-auto flex justify-center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
            </div>
          </div>
        </nav>
        {/* <Toolbar disableGutters>
          <div >
            <Link to={'/'}>
              <img style={{ width: 200 }} src={img} alt="ima" />
            </Link>
          </div>

          <Box className='text-sky-600 ml-auto mr-auto flex justify-center'  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
        </Toolbar> */}
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
