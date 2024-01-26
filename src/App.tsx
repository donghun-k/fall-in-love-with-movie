import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import TanstackQueryContextProvider from './contexts/TanstackQueryContext';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onUserStateChange } from './services/auth';
import { setUser, setIsCheckingAuth } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onUserStateChange((user) => {
      dispatch(setUser(user));
      dispatch(setIsCheckingAuth(false));
    });
  }, [dispatch]);

  return (
    <TanstackQueryContextProvider>
      <HelmetProvider>
        <Layout>
          <Outlet />
        </Layout>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryContextProvider>
  );
}

export default App;
