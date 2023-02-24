import {Link} from "react-router-dom";


import axios from "axios";
import { useState, } from "react";

import styles from "../layouts/simple/styles.module.css";

function Login () {
    const googleAuth = () =>{
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google`,
            "_self"
        );
    };
    const [user, setUser] = useState(null);
    const getUser = async () => {
        	try {
        		const url = `http://localhost:5000/currentUser`;
        		const { data } = await axios.get(url, { withCredentials: true });
        		setUser(data.user._json);
                console.log((JSON.parse(data)).data.email);

        	} catch (err) {
        		console.log(err);
        	}
    }

    

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Đăng nhập</h1>
            <div className={styles.form_container}>
                <div className={styles.center}>
                <h6 className={styles.from_heading}>Sử dụng email để đăng nhập vào hệ thống</h6>
                <button type="button" className={styles.google_btn} onClick ={googleAuth}>
                  <img src="../../public/assets/google.jpg" alt="google icon" />
						<span>Đăng nhập với Google</span>

                </button>
                <p className={styles.text}>
						 <Link to="">Bạn là quản trị viên ?</Link>
					</p>
                </div>
            </div>
        </div>
    );
}
export default Login;