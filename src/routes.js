import { Navigate, useRoutes } from 'react-router-dom';
// layouts

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
import YearPage from './pages/Yearpage';
import DoiTuongPage from './pages/DoiTuongPage';
import InsertChildren from './pages/admin/components/children/CreateChildren';
import EditChildren from './pages/admin/components/children/EditChildren';
import InsertBlog from './pages/admin/components/blog/CreateBlog';

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
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'scholarship', element: <ScholarshipPage /> },
        { path: 'sponser', element: <SponserPage /> },
        { path: 'year', element: <YearPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'children',
          children: [
            { path: '/dashboard/children/doi-tuong', element: <DoiTuongPage /> },
            { path: '/dashboard/children/list', element: <ChildrenPage /> },
            { path: '/dashboard/children/insert', element: <InsertChildren /> },
            { path: '/dashboard/children/edit/:id', element: <EditChildren /> },
          ],
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
    // {
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/children" />, index: true  },
    //     { path: '/dashboard/children/insert', element: <InsertChildren /> },
    //     { path: '/dashboard/children/edit/:id', element: <EditChildren /> },
    //   ],
    // },
    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/blog" /> },
        { path: '/dashboard/blog/insert', element: <InsertBlog /> },
      ],
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
