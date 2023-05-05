import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const [curentTitle, setCurentTitle] = useState('');

  const handleTitle = (title) => {
    setCurentTitle(title);
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item, index) => (
          <NavItem key={item.title} item={item} curentTitle={curentTitle} handleTitle={handleTitle} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  curentTitle: PropTypes.string,
  handleTitle: PropTypes.func,
};

function NavItem({ item, curentTitle, handleTitle }) {
  const [openSubNav, setOpenSubNav] = useState(false);
  const { title, path, icon, info, subNav } = item;

  const handleOpenSubNav = () => {
    // handleTitle(item.title);
    setOpenSubNav(!openSubNav);
  };

  const handleActiveNav = () => {
    handleTitle(item.title);
  };

  return (
    <>
      {item.subNav ? (
        <StyledNavItem
          onClick={handleOpenSubNav}
          component={RouterLink}
          to={path}
          sx={{
            color: item.title === curentTitle && 'text.primary',
            bgcolor: item.title === curentTitle && 'action.selected',
            fontWeight: item.title === curentTitle && 'fontWeightBold',
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </StyledNavItem>
      ) : (
        <StyledNavItem
          onClick={handleActiveNav}
          component={RouterLink}
          to={path}
          sx={{
            color: item.title === curentTitle && 'text.primary',
            bgcolor: item.title === curentTitle && 'action.selected',
            fontWeight: item.title === curentTitle && 'fontWeightBold',
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </StyledNavItem>
      )}

      {subNav && openSubNav && (
        <>
          <List sx={{ p: 0 }}>
            {subNav.map((subNavItem) => (
              <SubNavItem key={subNavItem.title} item={subNavItem} handleActiveNav={handleActiveNav} />
            ))}
          </List>
        </>
      )}
    </>
  );
}

function SubNavItem({ item, handleActiveNav }) {
  return (
    <>
      <StyledNavItem
        onClick={handleActiveNav}
        component={RouterLink}
        to={item.path}
        sx={{
          '&.active': {
            color: '#0066FF',
            // bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
        }}
      >
        <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>

        <ListItemText style={{marginLeft:'15px'}} disableTypography primary={item.title} />
      </StyledNavItem>
    </>
  );
}
