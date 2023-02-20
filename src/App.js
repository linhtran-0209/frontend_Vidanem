// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import axios from 'axios';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const [user, setUser] = useState(null);
    const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
            
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
