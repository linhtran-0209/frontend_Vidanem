import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// @mui
import { alpha, useTheme } from '@mui/material/styles';

import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import Iconify from '../../../components/iconify';
// mocks_

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('avatar');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
    navigate(`/`); 
  };

  return (
    <IconButton onClick={handleLogout} sx={{ width: 40, height: 40 }}>
    {/* <Badge badgeContent={totalUnRead} color="error"> */}
      <Iconify  sx={{ width: 40, height: 40 }} icon="mdi:logout-variant" />
    {/* </Badge> */}
  </IconButton>
  );
}
