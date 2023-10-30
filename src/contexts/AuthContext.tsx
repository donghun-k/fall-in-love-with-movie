import { User } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { onUserStateChange } from '../api/auth';

interface AuthContextValue {
  user: User | null;
  isCheckingAuth: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isCheckingAuth: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      setIsCheckingAuth(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
