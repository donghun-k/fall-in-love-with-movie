import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home/HomePage';
// import SignInPage from '../pages/signin/SignInPage';
// import SearchPage from '../pages/search/SearchPage';
// import MovieDetailPage from '../pages/movie/MovieDetailPage';
// import MyPage from '../pages/mypage/MyPage';
// import PrivateRoute from '../pages/PrivateRoute';
// import PublicRoute from '../pages/PublicRoute';
import { Suspense, lazy } from 'react';
import LoadingPage from '../components/common/LoadingPage';

const SignInPage = lazy(() => import('../pages/signin/SignInPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const MovieDetailPage = lazy(() => import('../pages/movie/MovieDetailPage'));
const MyPage = lazy(() => import('../pages/mypage/MyPage'));
const PrivateRoute = lazy(() => import('../pages/PrivateRoute'));
const PublicRoute = lazy(() => import('../pages/PublicRoute'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: '/movie/:movieId',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MovieDetailPage />
          </Suspense>
        ),
      },
      {
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PublicRoute />
          </Suspense>
        ),
        children: [
          {
            path: '/signin',
            element: <SignInPage />,
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PrivateRoute />
          </Suspense>
        ),
        children: [
          {
            path: '/mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
