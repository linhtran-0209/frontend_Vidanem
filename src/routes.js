import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { element } from 'prop-types';
import { Children } from 'react';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Hompage from './pages/client/HomePage';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SponserPage from './pages/SponserPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ScholarshipPage from './pages/ScholarshipPage';
import ChildrenPage from './pages/ChildrenPage';
import InsertChildren from './pages/admin/components/children/CreateChildren';
// import AccountPopover from './layouts/dashboard/header/AccountPopover';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <Hompage />,
      children: [
        { element: <Navigate to="/homepage" />, index: true },
        { path: '/homepage', element: <LoginPage /> },
      ],
    },
    {
      element: <LoginPage />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '/login', element: <LoginPage /> },
      ],
    },
    {
      
      element: <DashboardLayout />,
      children: [{ element: <Navigate to="/dashboard/children" /> },
          { path: '/dashboard/children/insert', element: <InsertChildren /> }],
    },
    {
      
      element: <DashboardLayout />,
      children: [{ element: <Navigate to="/dashboard/year" /> },
          { path: '/dashboard/year' }],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'scholarship', element: <ScholarshipPage /> },
        { path: 'sponser', element: <SponserPage /> },
        { path: 'year', element: <InsertChildren /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'children',
          element: <ChildrenPage />,
          
        },
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
