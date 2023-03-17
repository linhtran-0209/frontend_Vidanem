// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import {StyleCreateUser} from'./pages/admin/components/user/CreateUserModal.css';
import {StylesUserPages} from './pages/UserPage.css'
import {StylesUpdateUserModal} from './pages/admin/components/user/InsertUserModal.css';
import {StylesDeleteUserModal}from './pages/admin/components/user/DeleteUserModal.css';
// import {StyleCreateSponsor} from './pages/admin/components';

// import {Global} from './utils/global.css';
// import axios from 'axios';
// import { useEffect, useState } from "react";



export default function App() {
	console.log (process.env.REACT_APP_API_URL);
  // const [user, setUser] = useState(null);
  //   const getUser = async () => {
	// 	try {
	// 		const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
	// 		const { data } = await axios.get(url, { withCredentials: true });
	// 		setUser(data.user._json);
            
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// useEffect(() => {
	// 	getUser();
	// }, []);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
