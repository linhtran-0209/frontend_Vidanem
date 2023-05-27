import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Alert,
  Box,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

function getFirstCharacter(name) {
  return name && name.charAt(0).toUpperCase();
}

function createAvatar(name) {
  return {
    name: getFirstCharacter(name),
    color: 'success',
  };
}

CommentItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  tagUser: PropTypes.string,
  postedAt: PropTypes.string,
  hasReply: PropTypes.bool,
};

export function CommentItem({ _id, name, avatarUrl, email, postedAt, comment, hasReply }) {
  const [openReply, setOpenReply] = useState(false);
  const [binhLuan, setBinhLuan] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const [textFieldEmailError, setTextFieldEmailError] = useState(false);
  const [textFieldHoTenError, setTextFieldHoTenError] = useState(false);
  const [textFieldCommentError, setTextFieldCommentError] = useState(false);
  const [detailEmailError, setdetailEmailError] = useState('');

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleSubmit = async () => {
    // Kiểm tra định dạng email
    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    console.log(sessionStorage.getItem('email'));

    if (!binhLuan.email && !sessionStorage.getItem('email')) {
      setTextFieldEmailError(true);
      setdetailEmailError('Vui lòng nhập email');
    } else if (validateEmail(binhLuan.email) === false && !sessionStorage.getItem('email')) {
      setTextFieldEmailError(true);
      setdetailEmailError('Nhập sai định dạng email');
    } else setTextFieldEmailError(false);
    if (!binhLuan.hoTen && !sessionStorage.getItem('name')) {
      setTextFieldHoTenError(true);
    } else setTextFieldHoTenError(false);
    if (!binhLuan.comment) {
      setTextFieldCommentError(true);
    } else setTextFieldCommentError(false);

    if (
      ((binhLuan.email && validateEmail(binhLuan.email)) || sessionStorage.getItem('email')) &&
      (binhLuan.hoTen || sessionStorage.getItem('name')) &&
      binhLuan.comment
    ) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/binhluan/insertNewChild`;
        await axios
          .put(
            url,
            {
              id: _id,
              email: binhLuan.email || sessionStorage.getItem('email'),
              hoTen: binhLuan.hoTen || sessionStorage.getItem('name'),
              comment: binhLuan.comment,
            },
            { withCredentials: true }
          )
          .then((data) => {
            setOpenSuccessMessage(data.data.message);
          });
      } catch (err) {
        console.log(err);
        setOpenErrMessage(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 50, top: 250 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 50, top: 250 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} color={avatarUrl ? 'default' : createAvatar(email).color} sx={{ width: 48, height: 48 }}>
            {createAvatar(email).name}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <>
              <Typography variant="subtitle1">
                {name} <span style={{ fontWeight: 'normal', fontSize: '15px' }}>{`<${email}>`}</span>
              </Typography>
            </>
          }
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDateTime(postedAt)}
              </Typography>
              <Typography component="span" variant="body1">
                {comment}
              </Typography>
              <Typography component="div" variant="body2">
                {!hasReply && (
                  <Button size="small" onClick={handleOpenReply}>
                    Trả lời
                  </Button>
                )}
              </Typography>
            </>
          }
        />
      </ListItem>

      {!hasReply && openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            mt: -3,
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          {!sessionStorage.getItem('role') && (
            <div className="info-comment">
              <TextField
                fullWidth
                size="small"
                placeholder="Họ tên"
                sx={{
                  '& fieldset': {
                    borderWidth: `1px !important`,
                    borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                  },
                }}
                onChange={(e) => {
                  setTextFieldHoTenError(false);
                  setBinhLuan({ ...binhLuan, hoTen: e.target.value });
                }}
                error={textFieldHoTenError}
                helperText={textFieldHoTenError && 'Vui lòng nhập họ tên'}
              />
              <TextField
                fullWidth
                size="small"
                placeholder="Email"
                sx={{
                  '& fieldset': {
                    borderWidth: `1px !important`,
                    borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                  },
                }}
                onChange={(e) => {
                  setTextFieldEmailError(false);
                  setBinhLuan({ ...binhLuan, email: e.target.value });
                }}
                error={textFieldEmailError}
                helperText={textFieldEmailError && detailEmailError}
              />
            </div>
          )}

          <TextField
            fullWidth
            size="small"
            placeholder="Viết bình luận"
            sx={{
              mt: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
            onChange={(e) => {
              setTextFieldCommentError(false);
              setBinhLuan({ ...binhLuan, comment: e.target.value });
            }}
            error={textFieldCommentError}
            helperText={textFieldCommentError && 'Vui lòng nhập bình luận'}
          />
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <LoadingButton
              onClick={handleSubmit}
              variant="contained"
              style={{ mt: 1, marginLeft: 'auto', marginRight: 0, width: '20%', backgroundColor: '#00AB55' }}
            >
              Gửi
            </LoadingButton>
          </div>
        </Box>
      )}

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  );
}
