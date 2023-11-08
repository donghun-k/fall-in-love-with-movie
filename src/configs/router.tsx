import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home/HomePage';
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
    element: (
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
    ),
    children: [
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
    ],
  },
]);

export default router;
