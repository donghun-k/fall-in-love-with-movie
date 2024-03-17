/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/page'));
const SignInPage = lazy(() => import('../pages/signIn/page'));
const SearchPage = lazy(() => import('../pages/search/page'));
const MovieDetailPage = lazy(() => import('../pages/movie/page'));
const MyPage = lazy(() => import('../pages/mypage/page'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/movie/:movieId',
    element: <MovieDetailPage />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/mypage',
        element: <MyPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes;
