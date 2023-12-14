import { Typography, Grid, Stack, TextField, Alert, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// ----------------------------------------------------------------------

PostComment.propTypes = {
  id: PropTypes.string.isRequired,
};

export function PostComment({ id }) {
  const [comment, setComment] = useState({});
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');

  const [textFieldEmailError, setTextFieldEmailError] = useState(false);
  const [textFieldHoTenError, setTextFieldHoTenError] = useState(false);
  const [textFieldCommentError, setTextFieldCommentError] = useState(false);
  const [detailEmailError, setdetailEmailError] = useState('');

  const handleSubmit = async () => {
    // Kiểm tra định dạng email
    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    if (!comment.email) {
      console.log(1);
      setTextFieldEmailError(true);
      setdetailEmailError('Vui lòng nhập email');
    } else if (validateEmail(comment.email) === false) {
      setTextFieldEmailError(true);
      setdetailEmailError('Nhập sai định dạng email');
    } else setTextFieldEmailError(false);
    if (!comment.hoTen) {
      setTextFieldHoTenError(true);
    } else setTextFieldHoTenError(false);
    if (!comment.comment) {
      setTextFieldCommentError(true);
    } else setTextFieldCommentError(false);
    console.log(textFieldEmailError);
    if (comment.email && validateEmail(comment.email) && comment.hoTen && comment.comment) {
      try {
        const url = `${process.env.REACT_APP_API_URL}/binhluan/insertNew`;
        await axios
          .post(
            url,
            {
              email: comment.email,
              hoTen: comment.hoTen,
              comment: comment.comment,
              treEm: id,
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
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 50 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 'inherit', right: 100, top: 50 }} severity="error">
          {openErrMessage}
        </Alert>
      )}

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Gửi lời chúc
      </Typography>

      <Stack spacing={1} style={{ width: '100%' }}>

        <div className='flex gap-4'>
          <div className="grow">
            <div className="grow relative">
              <input onChange={(e) => {
                setTextFieldHoTenError(false);
                setComment({ ...comment, hoTen: e.target.value });
              }}
                required
                type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Họ tên *</label>
            </div>
            {
              textFieldHoTenError &&
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">Vui lòng nhập họ tên</p>
            }
          </div>
          <div className='grow'>
            <div className=" relative">
              <input
                onChange={(e) => {
                  setTextFieldEmailError(false);
                  setComment({ ...comment, email: e.target.value });
                }}
                required
                type="text" id={textFieldEmailError ? 'outlined_error' : 'floating_outlined'} aria-describedby={textFieldEmailError ? 'outlined_error_help' : ''} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email *</label>
            </div>
            {
              textFieldEmailError &&
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">{detailEmailError}</p>
            }
          </div>
        </div>
        <div>
          <div className="relative">
            <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Bình luận</label>
          </div>
          {
              textFieldCommentError &&
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">Vui lòng nhập bình luận</p>
            }
        </div>

        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          style={{ marginLeft: 'auto', marginRight: 0, width: '20%', backgroundColor: '#00AB55', marginBottom: '5%' }}
        >
          Gửi
        </LoadingButton>
      </Stack >
      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(0)})`,
        }}
      />
    </>
  );
}
