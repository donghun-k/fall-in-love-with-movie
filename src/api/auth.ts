import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  NextFn,
  User,
  deleteUser,
  getAuth,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth';
import app from '../configs/firebase';

const auth = getAuth(app);

type AuthType = 'google' | 'github';

const AUTH_PROVIDER: Record<AuthType, AuthProvider> = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

export const signIn = async (authType: AuthType) => {
  const provider = AUTH_PROVIDER[authType];
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return user;
};

export const signOut = async () => {
  await signOutFirebase(auth);
};

export const deleteAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  await deleteUser(user);
};

export const onUserStateChange = (callback: NextFn<User | null>) => {
  auth.onAuthStateChanged((user) => {
    callback(user);
  });
};
