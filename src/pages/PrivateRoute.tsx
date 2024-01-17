import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import LoadingPage from '../components/ui/LoadingPage';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (isCheckingAuth) return <LoadingPage />;

  return <Outlet />;
};

export default PrivateRoute;
