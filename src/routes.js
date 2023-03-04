import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { element } from 'prop-types';
import { Children } from 'react';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SponserPage from './pages/SponserPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ChildrenPage from './pages/ChildrenPage';
import AccountPopover from './layouts/dashboard/header/AccountPopover';
import Navbar from './components/nav-section/NavbarClient';
// import AddingPageUser from './pages/admin/addingPage/AddingPageUser';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path:'/nav',
      element:<Navbar/>,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'sponser', element: <SponserPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path:"children", element:<ChildrenPage/>},
      ],
    },
    // {
    //   path :'/user',
    //   element: <UserPage/>,
    //   children: [
    //     { element: <Navigate to="/user" />, index: true},
    //     {path: 'add'}
    //   ]
    // },
    {
      path:'/account',
      element:<AccountPopover />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
