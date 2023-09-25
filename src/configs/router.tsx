import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home/HomePage';
import SignInPage from '../pages/signin/SignInPage';

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
    ],
  },
]);

export default router;
