import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onUserStateChange } from './services/auth';
import { setUser, setIsCheckingAuth } from './store/authSlice';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import routes from './routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onUserStateChange((user) => {
      dispatch(setUser(user));
      dispatch(setIsCheckingAuth(false));
    });
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
