import {Link} from "react-router-dom";


import styles from "../layouts/simple/styles.module.css";
// import axios from "axios";
function Login () {
    const googleAuth = () =>{
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google`,
            "_self"
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Đăng nhập</h1>
            <div className={styles.form_container}>
                <div className={styles.center}>
                <h6 className={styles.from_heading}>Sử dụng email để đăng nhập vào hệ thống</h6>
                <button type="button" className={styles.google_btn} onClick ={googleAuth}>
                  <img src="../../public/assets/google.png" alt="google icon" />
					<span>Đăng nhập với Google</span>

                </button>
                <p className={styles.text}>
						 <Link to="/admin/login">Bạn là quản trị viên ?</Link>
					</p>
                </div>
            </div>
        </div>
    );
}
export default Login;