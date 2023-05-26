// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './pages/admin/components/user/CreateUserModal.css';
import  './pages/admin/components/user/CreateUserExcelModal.css';
import './pages/UserPage.css';
import './pages/ScholarshipPage.css';
import './pages/admin/components/user/InsertUserModal.css';
import './pages/admin/components/user/DeleteUserModal.css';
import './pages/SponserPage.css';
// import {StylesCreateSponsor} from './pages/admin/components/sponsor/CreateSponsor.css'
import './sections/@dashboard/user/UserListToolbar.css';
import './pages/ChildrenPage.css';
import './pages/DoiTuongPage.css';
import './pages/admin/components/children/CreateChildren.css';
import './pages/admin/components/scholarship/CreateScholarship.css';
import './pages/admin/components/scholarship/EditModal.css';
import './pages/admin/components/sponsor/CreateSponsor.css';
import './pages/admin/components/sponsor/EditModalSponsor.css';
import './pages/admin/components/blog/CreateBlog.css';
import './pages/admin/components/children/DialogHocTap.css';
import './pages/BlogPage.css';
import './pages/admin/components/blog/PreviewNewBlog.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
