import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, Button, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  // justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 5),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  minWidth: 320,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

SponserToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function SponserToolbar({ filterName, onFilterName, onClickSearch }) {
  return (
    <StyledRoot
      sx={{
        height:50,
      }}
    >

        <StyledSearch sx={{height:40}}
          value={filterName}
          onChange={onFilterName}
          onBlur={onClickSearch}
          onKeyDown={onClickSearch}
          placeholder="Tên đơn vị tài trợ..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />

        {/* <Tooltip title="Tìm kiếm" sx={{marginLeft: 2}}>
        <Button variant="contained" onClick={onClickSearch}>
            Tìm kiếm
        </Button>
        </Tooltip> */}

    </StyledRoot>
  );
}

