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
import TreEmpage from './pages/client/TreEmPage';

// import AccountPopover from './layouts/dashboard/header/AccountPopover';

// ----------------------------------------------------------------------
const role = {
  THANH_PHO: 1,
  QUAN_HUYEN: 2,
  PHUONG_XA: 3,
};
// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
  const checkRole = +sessionStorage.getItem('role');

  // Redirect to home page if the user does not have permission
  if (!checkRole) {
    return <Navigate to="/login" replace />;
  }

  const index = roles.findIndex((i) => i === checkRole);

  if (index === -1) {
    return <Navigate to="/dashboard/app" replace />;
  }
  return children;
};

export default function Router() {
  const routes = useRoutes([
    {
      element: <Hompage />,
      children: [{ element: <Navigate to="/homepage" />, index: true }, { path: '/homepage' }],
    },
    {
      element: <CommunityPage />,
      children: [{ element: <Navigate to="/communitypage" />, index: true }, { path: '/communitypage' }],
    },
    {
      element: <DetailNews />,
      children: [{ element: <Navigate to="/news/:id" />, index: true }, { path: '/news/:id' }],
    },
    {
      element: <TreEmpage />,
      children: [{ element: <Navigate to="/tre-em" />, index: true }, { path: '/tre-em' }],
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
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]}>
              <DashboardAppPage />
            </Protected>
          ),
        },
        {
          path: 'users',
          element: (
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN]}>
              <UserPage />
            </Protected>
          ),
        },
        {
          path: 'scholarship',
          element: (
            <Protected roles={[role.THANH_PHO]}>
              <ScholarshipPage />
            </Protected>
          ),
        },
        {
          path: 'sponser',
          element: (
            <Protected roles={[role.THANH_PHO]}>
              <SponserPage />
            </Protected>
          ),
        },
        {
          path: 'year',
          element: (
            <Protected roles={[role.THANH_PHO]}>
              <YearPage />
            </Protected>
          ),
        },
        {
          path: 'blog',
          element: (
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN]}>
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
                <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]}>
                  {' '}
                  <DoiTuongPage />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/list',
              element: (
                <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]}>
                  <ChildrenPage />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/insert',
              element: (
                <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]}>
                  <InsertChildren />
                </Protected>
              ),
            },
            {
              path: '/dashboard/children/edit/:id',
              element: (
                <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]}>
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
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN]}>
              <InsertBlog />
            </Protected>
          ),
        },
        {
          path: '/dashboard/blog/edit/:id',
          element: (
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN]}>
              <EditBlog />
            </Protected>
          ),
        },
        {
          path: '/dashboard/title',
          element: (
            <Protected roles={[role.THANH_PHO, role.QUAN_HUYEN]}>
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
