import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const SignInPage = lazy(() => import('../pages/signIn/SignInPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const MovieDetailPage = lazy(() => import('../pages/movie/MovieDetailPage'));
const MyPage = lazy(() => import('../pages/mypage/MyPage'));
const PrivateRoute = lazy(() => import('../pages/PrivateRoute'));
const PublicRoute = lazy(() => import('../pages/PublicRoute'));

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
