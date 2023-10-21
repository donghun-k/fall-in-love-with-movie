import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home/HomePage';
import SignInPage from '../pages/signin/SignInPage';
import SearchPage from '../pages/search/SearchPage';
import MovieDetailPage from '../pages/movie/MovieDetailPage';
import MyPage from '../pages/mypage/MyPage';

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
        path: '/signin',
        element: <SignInPage />,
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
        path: '/mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
