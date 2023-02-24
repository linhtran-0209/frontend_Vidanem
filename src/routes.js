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


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'sponser', element: <SponserPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path:"children", element:<ChildrenPage/>},
      ],
    },
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
