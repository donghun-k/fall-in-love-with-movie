import { Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import LoadingPage from '../components/common/LoadingPage';
import { useEffect } from 'react';

const PublicRoute = () => {
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useAuthContext();
  useEffect(() => {
    if (isCheckingAuth) return;
    if (user) {
      navigate(-1);
    }
  }, [user, navigate, isCheckingAuth]);

  if (isCheckingAuth) return <LoadingPage />;

  return <Outlet />;
};

export default PublicRoute;