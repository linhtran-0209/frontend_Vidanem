import { Typography, Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// ----------------------------------------------------------------------

PostComment.propTypes = {
  id: PropTypes.string.isRequired,
};

export function PostComment({id}) {
  const [comment, setComment] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/binhluan/insertNew`;
      await axios
        .post(
          url,
          {
            email: comment.email,
            hoTen: comment.hoTen,
            comment: comment.comment,
            baiViet: id,
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
      <div className="post-comment">
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Bình luận
        </Typography>

        <Stack spacing={1} style={{ width: '100%' }}>
          <div className="info-comment">
            <TextField fullWidth label="Họ Tên *" onChange={(e) => setComment({ ...comment, hoTen: e.target.value })} />
            <TextField fullWidth label="Email *" onChange={(e) => setComment({ ...comment, email: e.target.value })} />
          </div>
          <TextField
            name="comment"
            label="Bình luận *"
            multiline
            rows={3}
            onChange={(e) => setComment({ ...comment, comment: e.target.value })}
          />
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            style={{ marginLeft: 'auto', marginRight: 0, width: '20%', backgroundColor: '#00AB55' }}          >
            Gửi
          </LoadingButton>
        </Stack>
      </div>
    </>
  );
}
