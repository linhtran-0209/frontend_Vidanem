import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import { bgBlur } from '../../utils/cssStyles';
//
import Navbar from '../../sections/home/nav/navbar';

import Slider from '../../sections/home/slider/sliderHomepage';

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
export default function Homepage() {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Navbar />
         {/* <Slider /> */}
      </StyledToolbar>
    </StyledRoot>
  );
}
