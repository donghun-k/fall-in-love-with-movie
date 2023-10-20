import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './configs/queryClient';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Outlet />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
