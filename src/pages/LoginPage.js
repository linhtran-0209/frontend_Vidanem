import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import styles from '../layouts/simple/styles.module.css';

function Login() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   getUser();
  // }, []);
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
  };

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/currentUser`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     if (data)
  //     {
  //       sessionStorage.setItem('role', data.quyen);
  //       sessionStorage.setItem('name', data.hoTen);
  //       sessionStorage.setItem('avatar', data.avatar);
  //       navigate(`/dashboard/app`);
  //     } 
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
