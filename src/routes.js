import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// layouts

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Hompage from './pages/client/HomePage';
//
import CommunityPage from './pages/client/CommunityPage';
import ContactPage from './pages/client/ContactPage';
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
import EditBlog from './pages/admin/components/blog/EditBlog';
import TitleBlog from './pages/TitleBlog';
import DetailNews from './sections/home/tinbai/DetailNews';

// import AccountPopover from './layouts/dashboard/header/AccountPopover';

// ----------------------------------------------------------------------
// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
  const checkRole = sessionStorage.getItem('role');

  // Redirect to home page if the user does not have permission
  if (!checkRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
      element: <CommunityPage />,
      children: [{ element: <Navigate to="/communitypage" />, index: true }, { path: '/communitypage' }],
    },
    {
      element: <DetailNews />,
      children: [{ element: <Navigate to="/homepage/detail" />, index: true }, { path: '/communitypage' }],
    },
   
    {
      element: <ContactPage />,
      children: [{ element: <Navigate to="/contactpage" />, index: true }, { path: '/contactpage' }],
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
        {
          path: 'app',
          element: (
            <Protected>
              <DashboardAppPage />
            </Protected>
          ),
        },
        {
          path: 'users',
          element: (
            <Protected>
              <UserPage />
            </Protected>
          ),
        },
        {
          path: 'scholarship',
          element: (
            <Protected>
              <ScholarshipPage />
            </Protected>
          ),
        },
        {
          path: 'sponser',
          element: (
            <Protected>
              <SponserPage />
            </Protected>
          ),
        },
        {
          path: 'year',
          element: (
            <Protected>
              <YearPage />
            </Protected>
          ),
        },
        {
          path: 'blog',
          element: (
            <Protected>
              <BlogPage />
            </Protected>
          ),
        },
        {
          path: 'children',
          children: [
            {
              path: '/dashboard/children/doi-tuong',
              element: (
                <Protected>
                  {' '}
                  <DoiTuongPage />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/list',
              element: (
                <Protected>
                  <ChildrenPage />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/insert',
              element: (
                <Protected>
                  <InsertChildren />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/edit/:id',
              element: (
                <Protected>
                  <EditChildren />{' '}
                </Protected>
              ),
            },
          ],
        },
      ],
    },

    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/blog" /> },
        {
          path: '/dashboard/blog/insert',
          element: (
            <Protected>
              <InsertBlog />
            </Protected>
          ),
        },
        {
          path: '/dashboard/blog/edit/:id',
          element: (
            <Protected>
              <EditBlog />
            </Protected>
          ),
        },
        {
          path: '/dashboard/title',
          element: (
            <Protected>
              <TitleBlog />
            </Protected>
          ),
        },
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
