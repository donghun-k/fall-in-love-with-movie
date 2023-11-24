import { Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import LoadingPage from '../components/ui/LoadingPage';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useAuthContext();
  useEffect(() => {
    if (isCheckingAuth) return;
    if (!user) navigate('/');
  }, [user, navigate, isCheckingAuth]);

  if (isCheckingAuth) return <LoadingPage />;

  return <Outlet />;
};

export default PrivateRoute;
