import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoadingPage from '../components/ui/LoadingPage';

const PublicRoute = () => {
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (isCheckingAuth) return <LoadingPage />;

  return <Outlet />;
};

export default PublicRoute;
