import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home/HomePage';
import SignInPage from '../pages/signin/SignInPage';
import SearchPage from '../pages/search/SearchPage';
import MovieDetailPage from '../pages/movie/MovieDetailPage';
import MyPage from '../pages/mypage/MyPage';
import PrivateRoute from '../pages/PrivateRoute';
import PublicRoute from '../pages/PublicRoute';

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
    ],
  },
]);

export default router;
