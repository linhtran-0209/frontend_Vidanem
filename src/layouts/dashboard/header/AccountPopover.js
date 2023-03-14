import axios from "axios";
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

// @mui
import { alpha, useTheme} from '@mui/material/styles';

import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import {login} from '../../../action/useraction';
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
//   const dispatch = useDispatch ();
//   const { error, user} = useSelector(
//  (state) => state.user
// );
// // const theme = useTheme();
//     // const [user, setUser] = useState(null);
//     useEffect(() => {
//       /*
  
//       const getUser = async () => {
//             try {
//               const url = `http://localhost:5000/currentUser`;
//               const { data } = await axios.get(url, { withCredentials: true });
//               setUser(data._json);
//                   console.log((JSON.parse(data)).data.email);      
//                   console.log("1234@asb.com");
  
//             } catch (err) {
//               console.log(err);
//            }
//       } */
//     dispatch(login());
  
//   }, [dispatch]);
    const theme = useTheme();
  const [user, setUser] = useState(null);
  useEffect(() => {
    

    const getUser = async () => {
        	try {
        		const url = `http://localhost:5000/api/v1/currentUser`;
        		const { data } = await axios.get(url, { withCredentials: true });
          const  parse=data.hoTen;
           		setUser(parse);
                // console.log((JSON.parse(data)).data.email);      
                console.log(data);
// console.log("data empty");
        	} catch (err) {
        		console.log(err);
        	}
    }
getUser();
    }, []);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {account.displayName} */}
            {user}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {account.email} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
