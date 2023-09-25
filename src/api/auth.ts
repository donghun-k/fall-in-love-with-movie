import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  NextFn,
  User,
  getAuth,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth';
import firebaseConfig from '../configs/firebase';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signIn = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return user;
};

export const signOut = async () => {
  await signOutFirebase(auth);
};

export const onUserStateChange = (callback: NextFn<User | null>) => {
  auth.onAuthStateChanged((user) => {
    callback(user);
  });
};
