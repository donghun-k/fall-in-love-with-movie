import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import TanstackQueryContextProvider from './contexts/TanstackQueryContext';

function App() {
  return (
    <AuthContextProvider>
      <TanstackQueryContextProvider>
        <HelmetProvider>
          <Layout>
            <Outlet />
          </Layout>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TanstackQueryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
