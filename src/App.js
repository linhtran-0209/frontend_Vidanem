// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import {StyleCreateUser} from'./pages/admin/components/user/CreateUserModal.css';
import {StyleCreateUserExcel} from './pages/admin/components/user/CreateUserExcelModal.css';
import {StylesUserPages} from './pages/UserPage.css';
import {StyleScholarshipPages} from'./pages/ScholarshipPage.css';
import {StylesUpdateUserModal} from './pages/admin/components/user/InsertUserModal.css';
import {StylesDeleteUserModal}from './pages/admin/components/user/DeleteUserModal.css';
import {StyleSponsorPage} from './pages/SponserPage.css';
// import {StylesCreateSponsor} from './pages/admin/components/sponsor/CreateSponsor.css'
import {styleSearchSponser} from './sections/@dashboard/user/UserListToolbar.css';
import {styleCreateChildren} from './pages/admin/components/children/CreateChildren.css';
import {StyleCreateScholarship} from './pages/admin/components/scholarship/CreateScholarship.css';
import {StyleUpdateScholarship} from './pages/admin/components/scholarship/EditModal.css';
import {StyleCreateSponsor} from './pages/admin/components/sponsor/CreateSponsor.css';
import {StyleEditSponsor} from './pages/admin/components/sponsor/EditModalSponsor.css';
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
