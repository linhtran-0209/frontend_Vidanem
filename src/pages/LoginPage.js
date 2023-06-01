import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import styles from '../layouts/simple/styles.module.css';

function Login() {
  const navigate = useNavigate();

  const googleAuth = async () => {
    try {
      window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
    } catch (error) {
      navigate(`/error`);
    }
  };

  return (
    <>
      <Helmet>
        <title> Đăng nhập</title>
      </Helmet>

      <div className={styles.container}>
        <h1 className={styles.heading}>Đăng nhập</h1>
        <div className={styles.form_container}>
          <div className={styles.center}>
            <h6 className={styles.from_heading}>Sử dụng email để đăng nhập vào hệ thống</h6>
            <button type="button" className={styles.google_btn} onClick={googleAuth}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
                alt="google icon"
              />
              <span>Đăng nhập với Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
