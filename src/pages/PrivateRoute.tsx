import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { ReactNode } from 'react';
import LoadingPage from '../components/common/LoadingPage';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useAuthContext();
  if (isCheckingAuth) return <LoadingPage />;
  if (!user) {
    alert('로그인 후 이용해주세요.');
    navigate('/signin', { replace: true });
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
